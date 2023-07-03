import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Buffer } from 'buffer';

@Injectable({
    providedIn: 'root'
  })
  export class SpotifyPluginService {
    digest:any;
    client_id:string = '6c78272d0d334aeeb0f60408c5a1dc76';
    redirect_uri:string = 'http://localhost:4200/spotify-project/authenticated';
    spotify_api_url = 'https://api.spotify.com/v1/me';
    access_token:string | undefined;
    refresh_token:string | undefined;
    expires_at:string | undefined;

    constructor (private http: HttpClient, private router: Router){
       this.init();
    }

    generateUrlWithSearchParams(url:string, params:any) {
      const urlObject = new URL(url);
      urlObject.search = new URLSearchParams(params).toString();
  
      return new URL(urlObject.toString());
    }
  
    
    redirectToSpotifyAuthorizeEndpoint() {
      const codeVerifier = this.generateRandomString(64);
      console.log(codeVerifier);
      this.generateCodeChallenge(codeVerifier).then((code_challenge) => {
        console.log(code_challenge);
        window.localStorage.setItem('code_verifier', codeVerifier);
  
        // Redirect to example:
        // GET https://accounts.spotify.com/authorize?response_type=code&client_id=77e602fc63fa4b96acff255ed33428d3&redirect_uri=http%3A%2F%2Flocalhost&scope=user-follow-modify&state=e21392da45dbf4&code_challenge=KADwyz1X~HIdcAG20lnXitK6k51xBP4pEMEZHmCneHD1JhrcHjE1P3yU_NjhBz4TdhV6acGo16PCd10xLwMJJ4uCutQZHw&code_challenge_method=S256
        
        let generatedUrl = this.generateUrlWithSearchParams(
          'https://accounts.spotify.com/authorize',
          {
            response_type: 'code',
            client_id: this.client_id,
            scope: 'user-read-private user-read-email user-library-read user-library-modify user-top-read user-read-recently-played',
            code_challenge_method: 'S256',
            code_challenge,
            redirect_uri: this.redirect_uri,
          },
        );
        // window.location.assign(generatedUrl); 
        window.open(generatedUrl, '_blank');      
      }).catch((e)=>{
        console.log(e);
      });
    }

    refreshToken(refresh_token:string) {
      console.log('Refreshing Spotify Token');
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
          client_id: this.client_id,
          grant_type: 'refresh_token',
          refresh_token,
        }),
      })
        .then(this.addThrowErrorToFetch)
        .then(this.processTokenResponse)
        .catch(this.handleError);
    }

    checkTokenExpiration(){
      const curr_time = new Date();
      const expire_time = new Date(Number(this.expires_at));
        if(this.refresh_token && curr_time.getTime() > expire_time.getTime()){
          this.refreshToken(this.refresh_token);
        }
    }

    isAuthenticated(){
      if(this.access_token && this.refresh_token){
        this.checkTokenExpiration();
        return true; 
      }
      else{
        return false;
      }
    }

    async init(){
      this.access_token = localStorage.getItem('access_token') ?? undefined;
      this.refresh_token = localStorage.getItem('refresh_token') ?? undefined;
      this.expires_at = localStorage.getItem('expires_at') ?? undefined;
    }

    base64encode(str:string) {
      return str.toString().replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    }

    handleError(error: Error) {
      console.error(error);
    }

    async addThrowErrorToFetch(response: any) {
      if (response.ok) {
        return response.json();
      } else {
        throw { response, error: await response.json() };
      }
    }

    getRecentlyPlayedTracks() {
      const recentlyPlayedUrl = 'https://api.spotify.com/v1/me/player/recently-played';
      const queryParams = new URLSearchParams({
        // limit: '50', // Maximum number of tracks to retrieve
        time_range: 'day' // Specify the time range
      });
    const recentlyPlayedUrlWithParams = `${recentlyPlayedUrl}?${queryParams.toString()}`;
    fetch(recentlyPlayedUrlWithParams, {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('THIS IS RECENTLY PLAYED', data);
      return data;
      });
  }

  
  async getAllRecentlyPlayedTracks(timespan:string = 'day'){
    const recentlyPlayedUrl = 'https://api.spotify.com/v1/me/player/recently-played';
    const queryParams = new URLSearchParams({
      limit: '50', // Maximum number of tracks to retrieve
      time_range: 'long_term' // Specify the time range
    });
    const recentlyPlayedUrlWithParams = `${recentlyPlayedUrl}?${queryParams.toString()}`;
    const headers = {
      Authorization: `Bearer ${this.access_token}`
    };
    let nextUrl = recentlyPlayedUrlWithParams;
    let allSongs: any[] = [];
    while (nextUrl) {
      const recentlyPlayedResponse = await fetch(nextUrl, { headers });
      const recentlyPlayedData = await recentlyPlayedResponse.json();
      allSongs = allSongs.concat(recentlyPlayedData.items)
      nextUrl = recentlyPlayedData.next;
    }
    let allIds: string[] = [];
    let filteredSongs: any[] = [];
    allSongs.forEach((song)=>{
      if(allIds.includes(song.track.id)){
        let repeatSong = filteredSongs.find((tempSong)=>{
          return tempSong.track.id == song.track.id;
        })
        repeatSong.listenCount++;
      }
      else{
        allIds.push(song.track.id);
        song.listenCount = 1;
        filteredSongs.push(song);
      }
    })
    return filteredSongs;
  }

  async getSongPlayCount(songName:string) {
    const searchUrl = 'https://api.spotify.com/v1/search';
    const searchParams = new URLSearchParams({
      q: songName,
      type: 'track',
      limit: '1'
    });
  
    const recentlyPlayedUrl = 'https://api.spotify.com/v1/me/player/recently-played';
    const headers = {
      Authorization: `Bearer ${this.access_token}`
    };
    let playCount = 0;
    let nextUrl = recentlyPlayedUrl;
    let count = 0;
    while (nextUrl) {
      const recentlyPlayedResponse = await fetch(nextUrl, { headers });
      const recentlyPlayedData = await recentlyPlayedResponse.json();
  
      const searchResponse = await fetch(`${searchUrl}?${searchParams.toString()}`, { headers });
      const searchData = await searchResponse.json();
      count++;
      const trackId = searchData.tracks.items[0].id;
      console.log(`${count}, ${recentlyPlayedData.items.length}, `)
      for (const item of recentlyPlayedData.items) {
        if (item.track.id === trackId) {
          playCount++;
        }
      }
  
      nextUrl = recentlyPlayedData.next;
      console.log(nextUrl);
    }
    console.log(`${songName} played ${playCount} times`)
    return playCount;
  }
    
    logout() {
      localStorage.clear();
      window.location.reload();
    }

    // async generateCodeChallenge(codeVerifier:string) {
    //   const digest = await crypto.subtle.digest(
    //     'SHA-256',
    //     new TextEncoder().encode(codeVerifier),
    //   );
  
    //   return Buffer.from(this.base64encode(String.fromCharCode(...new Uint8Array(digest))));
    // }

    async generateCodeChallenge(codeVerifier: string) {
      const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(codeVerifier),
      );
      const buffer = Buffer.from(digest);
      let base64Encoded = buffer.toString('base64');
      
      return base64Encoded
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    exchangeToken(code:string) {
      let code_verifier = localStorage.getItem('code_verifier');
      if(code_verifier == null){
        return;
      }
      let body =  new URLSearchParams({
        client_id: this.client_id,
        grant_type: 'authorization_code',
        code,
        redirect_uri:this.redirect_uri,
        code_verifier,
      })
      console.log('Body',body);
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body
      })
        .then(this.addThrowErrorToFetch)
        .then((data) => {
          console.log(data);
          this.processTokenResponse(data);
  
          // clear search query params in the url
          window.history.replaceState({}, document.title, '/');
        })
        .catch(this.handleError);
    }

    generateRandomString(length:number) {
        let text = '';
          let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
         for (let i = 0; i < length; i++) {
           text += possible.charAt(Math.floor(Math.random() * possible.length));
         }
         return text;
    }

    async getPlaylist() {
      console.log('Getting playlist')
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.access_token}`);
      const url = `${this.spotify_api_url}/top/tracks`;
      fetch(url, {
        headers: {
          Authorization: 'Bearer ' + this.access_token,
        },
      })
        .then(async (response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw await response.json();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    processAuthenticationResponse(){
      const args = new URLSearchParams(window.location.search);
      const code = args.get('code');
      if(!code){
        console.log('Code not in URL! Could not retrieve token');
        return;
      }
      this.exchangeToken(code);
      this.router.navigate(['/spotify-project']);
    }

    processTokenResponse(data:any) {
      let access_token = data.access_token;
      let refresh_token = data.refresh_token;
  
      const t = new Date();
      const expires_at = t.setSeconds(t.getSeconds() + data.expires_in);
  
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_at', ''+ expires_at);
      this.access_token = access_token;
      this.refresh_token = refresh_token;
      this.expires_at = ''+expires_at;
      console.log('New token!', this.access_token);
      // load data of logged in user
      // this.getUserData();
    }


    async getRecommendations(topTracksIds: String[]){
      // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
      return (await this.fetchWebApi(
        `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET', {}
      )).tracks;
    }

    getUserData() {
      this.checkTokenExpiration();
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + this.access_token,
        },
      })
        .then(async (response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw await response.json();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    async getTopTracks() {
      return await this.fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&limit=5', 'GET', {}
      );
    }

    async fetchWebApi(endpoint:string, method:string, body: any) {
      this.checkTokenExpiration();
      let options: any = {
          headers: {
            Authorization: 'Bearer ' + this.access_token,
          },
          method
        }
      if(method != 'GET'){
        options = {
          ...options,
          body: JSON.stringify(body)
        }
      }
      console.log(options);
      const res = await fetch(`https://api.spotify.com/${endpoint}`, options);
      console.log(res);
      return await res.json();
    }

    // async createPlaylist(tracksUri: String[]){
    //   return await this.fetchWebApi(
    //     `v1/users/${this.user_id}/playlists`, 'POST', {
    //       "name": "My recommendation playlist",
    //       "description": "Playlist created by the tutorial on developer.spotify.com",
    //       "public": false
    //   }).then(playlist => {
    //     this.fetchWebApi(
    //       `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    //       'POST', {}
    //     );
    //     return playlist;
    //   })
    // }


    async getProfile() {
      let accessToken = localStorage.getItem('access_token');
    
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    
      const data = await response.json();
    }


}