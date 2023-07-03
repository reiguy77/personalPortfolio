import { Component } from '@angular/core';
import { SpotifyPluginService } from 'src/app/services/spotifyPluginService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spotify-plugin',
  templateUrl: './spotify-plugin.component.html',
  styleUrls: ['./spotify-plugin.component.less']
})
export class SpotifyPluginComponent {
songs:{name:string, artist:string, imageUrl:string, album?:string, link:string}[]  = [];
recentSongs:any[] = [];
token = 'BQB60YM6jZwP0X1FYCNQcJlrFLXUcJ8MpCDqrLhUjIN9qLfTOvZBwQYxooJ79JGXxMzDRsk-q4qjS_w9thojPQ-qKUzyzxApcyY-QYs1W8jrelDkE02o2qCD50L0pWElaOOSTUIf347S6eONCt8mgN5oc58en8I-q8CZppG4ASNtrFedOcD2NPiy39K4IzMJf03kdkyskX_uUw3WIQ1pmANBGfvGXH-4ZzN_GhjglEq1DGmWakbbmPvq4NrEL7zmcZfZMKnmXmly9hPtqaKO9Fe59ZDmgggA8fsNCdNILltjZmznS5u8o5tMqsOSf7WjyZdohNw-wS1U-QV3DMkIceENWaU';
isSpotifyAuthenticated:boolean = false;
constructor(private spotifyPluginService: SpotifyPluginService, private route: ActivatedRoute) {
  this.isSpotifyAuthenticated = this.spotifyPluginService.isAuthenticated();
  if(this.isSpotifyAuthenticated){
    this.getSpotifyData();
    // this.getRecentTracks();
    this.getSongPlayCount();
    this.getRecentSongs();
  }
 }

 



async getPlaylist() {
  let playlist = this.spotifyPluginService.getPlaylist();
}

async getTopTracks(){
  let tracks = await this.spotifyPluginService.getTopTracks();
  tracks = tracks.items;
  this.songs = tracks.map((track:any)=>{
    let artistList:any = [];
    track.artists.forEach((artist:any)=>{
      artistList.push(artist.name)
    })
    return {
      'name':track.name,
      'artist':artistList.join(', '),
      'imageUrl':track.album.images[1].url,
      'album': track.album.name,
      'link': track.external_urls.spotify
    }
  })
  console.log(tracks);
}

async getRecentTracks(){
  let recentTracks = this.spotifyPluginService.getRecentlyPlayedTracks();
  console.log('RECENT TRACKS', recentTracks);
}

async getSongPlayCount(){
  // this.spotifyPluginService.getSongPlayCount("Cantaloupe Island - Remastered 1999/Rudy Van Gelder Edition");
}

async getRecentSongs(){
  this.recentSongs = await this.spotifyPluginService.getAllRecentlyPlayedTracks();
  console.log('RECENT SONGS', this.recentSongs);
}



ngOnInit(){
    const currentRoute = this.route.snapshot.url.join('/');
    if (currentRoute === 'spotify-project/authenticated') {
      this.spotifyPluginService.processAuthenticationResponse();
      this.isSpotifyAuthenticated = this.spotifyPluginService.isAuthenticated();
      this.getSpotifyData();
      this.getRecentTracks();
    }
  // this.getTopTracks();
}

async getSpotifyData() {
  await this.getTopTracks();
}

authenticateAccount() {
  this.spotifyPluginService.redirectToSpotifyAuthorizeEndpoint();
}

goToPage(url:string){
  window.open(url, '_blank');
}

}
