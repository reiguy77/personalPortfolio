import { Component, HostListener, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { AudioContextService } from './audio-context.service';
import { TrackComponent } from './track/track.component';

@Component({
  selector: 'drumpad',
  templateUrl: './drumpad.component.html',
  styleUrls: ['./drumpad.component.less']
})
export class DrumpadComponent {
  @ViewChildren(TrackComponent) tracks?: QueryList<TrackComponent>;

  beatsPerMeasure = 16;
  measures = 2;
  savedTracks = ['assets/temp-sounds/bass (1).wav','assets/temp-sounds/hi hat (6).wav', 'assets/temp-sounds/kick (1).WAV', 'assets/temp-sounds/snare (1).WAV','assets/temp-sounds/tom (1).WAV'];
  sounds:{sound:AudioBuffer, id:number}[]= [];
  isPlaying = false;
  totalBeats = this.beatsPerMeasure * this.measures;
  index = 0;
  tempo = 120;
  soundCount = 0;

  constructor(private audioContextService:AudioContextService){
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
    this.sounds.push({sound:audioBuffer, id:this.soundCount});
    this.soundCount++;
    this.index = (this.index + 1) % this.savedTracks.length;
  }

  deleteTrack(trackId:number){
    this.sounds = this.sounds.filter((sound)=>{
      return sound.id != trackId;
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
    this.tracks?.forEach((track: TrackComponent) => {
      track.clear();
    });
  }


  calculateBeats(){
    this.totalBeats = this.measures * this.beatsPerMeasure;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['measures'] || changes['beatsPerMeasure']){
      this.calculateBeats();
    }
  }


  

}
