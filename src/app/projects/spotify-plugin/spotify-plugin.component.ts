import { Component } from '@angular/core';
import { SpotifyPluginService } from 'src/app/projects/spotify-plugin/spotifyPluginService';
import { ActivatedRoute } from '@angular/router';
import { LeetCodeService } from 'src/app/projects/leetcode-plugin/leetCodeService';

@Component({
  selector: 'app-spotify-plugin',
  templateUrl: './spotify-plugin.component.html',
  styleUrls: ['./spotify-plugin.component.less']
})
export class SpotifyPluginComponent {
songs:{name:string, artist:string, imageUrl:string, album?:string, link:string}[]  = [];
recentSongs:any[] = [];
isSpotifyAuthenticated:boolean = false;
constructor(private spotifyPluginService: SpotifyPluginService, private route: ActivatedRoute, private leetCodeService: LeetCodeService) {
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
