import { Component, HostListener, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { AudioContextService } from './audio-context.service';
import { TrackComponent } from './track/track.component';
import { SelectSavedRhythmComponent } from './select-saved-rhythm/select-saved-rhythm.component';
import { SavedTrack } from './track/saved-track';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'drumpad',
  templateUrl: './drumpad.component.html',
  styleUrls: ['./drumpad.component.less']
})
export class DrumpadComponent {
  //In the future would be cool to save track to mp3...
  //Then see if you can line a bunch of them up, mix and match


  @ViewChildren(TrackComponent) trackComponents?: QueryList<TrackComponent>;
  @ViewChild('selectRhythm') selectRhythmComponent!: SelectSavedRhythmComponent;

  beatsPerMeasure = 16;
  measures = 2;
  savedTracks = ['assets/temp-sounds/bass (1).wav','assets/temp-sounds/hi hat (6).wav', 'assets/temp-sounds/kick (1).WAV', 'assets/temp-sounds/snare (1).WAV','assets/temp-sounds/tom (1).WAV'];
  tracks:{sound?:AudioBuffer, id:number, savedTrack?:SavedTrack}[]= [];
  isPlaying = false;
  totalBeats = this.beatsPerMeasure * this.measures;
  index = 0;
  tempo = 120;
  soundCount = 0;

  constructor(private audioContextService:AudioContextService, private downloadService:DownloadService){
    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        if (!document.querySelector(":focus")) {
        this.play();
        }
      }
    })
    this.initTracks();
  }

  ngOnInit(){
    this.onWindowResize();
  }

  async initTracks(){
    await this.addTrack();
    await this.addTrack();
    await this.addTrack();
    await this.addTrack();
    await this.addTrack();
  }

  async addTrack(){
    let audioBuffer =  await this.audioContextService.loadAudioFile(this.savedTracks[this.index]);
    this.tracks.push({sound:audioBuffer, id:this.soundCount});
    this.soundCount++;
    this.index = (this.index + 1) % this.savedTracks.length;
  }

  deleteTrack(trackId:number){
    this.tracks = this.tracks.filter((track)=>{
      return track.id != trackId;
    });
  }

  play(){
    this.isPlaying = !this.isPlaying;
    if(!this.isPlaying){
      this.audioContextService.stop();
    }
    else{
      this.audioContextService.start();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {

    if(window.outerWidth<=900){
      this.measures = 1;
    }
    else{
      this.measures = 2;
    }
    this.calculateBeats();
  }

  clear(){
    this.trackComponents?.forEach((track: TrackComponent) => {
      track.clear();
    });
  }


  calculateBeats(){
    this.totalBeats = this.measures * this.beatsPerMeasure;
  }

  saveRhythm(){
    let savedTracks:SavedTrack[] = [];
    this.trackComponents?.forEach((track)=>{
     savedTracks.push(track.saveTrack());
    })
    let savedRhythm = {
      'rhythm':savedTracks
    }
    this.downloadService.downloadObject(savedRhythm, 'drumpad-saved-rhythm.json');
  }

  selectSavedRhythm(){
    this.selectRhythmComponent.open();
  }

  loadSavedTracks(data:any){
    this.tracks = [];
    let tracks = data.rhythm;
    tracks.forEach(async (track:SavedTrack, index:number)=>{
      this.tracks.push({
        id: index,
        savedTrack: track 
      })
      this.soundCount++;
    })
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['measures'] || changes['beatsPerMeasure']){
      this.calculateBeats();
    }
  }


  

}
