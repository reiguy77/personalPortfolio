import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AudioContextService, AudioContextState } from '../audio-context.service';
import * as uuid from 'uuid';
import { Subscription } from 'rxjs';
import { SelectSoundComponent } from '../select-sound/select-sound.component';
import { SavedTrack } from './saved-track';
import { AssetService } from 'src/app/services/asset-service.service';

@Component({
  selector: 'drum-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.less'],
  // providers: [AssetService]
})
export class TrackComponent implements OnChanges{
  private audioContextStateSubscription: Subscription;
  @Input() totalBeats: number = 0;
  @Input() sound?:AudioBuffer;
  @Input() id:number = 0;
  @Input() isPlaying:boolean = false;
  @Input() tempo: number = 90;
  @Input() beatsPerMeasure: number = 16;
  @Input() savedTrack?: SavedTrack;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  timerId:any = null;
  soundId = uuid.v4();
  trackName = '';
  trackBeats: {selected:boolean, currentBeat:boolean}[] = []; 
  previousTrackBeats: {selected:boolean, currentBeat:boolean}[] = []; 
  nextBeatTime:number = 0;
  lastBeatDrawn = 0;
  editName = false;
  scheduleAheadTime:number = .2;
  interval:number = 50;
  currentBeat:number = 0;
  currentBeatDrawn: number = 0;
  beatsInQueue:{time:number, beat:number}[] = [];
  dropdownOptions = [
    {
      name:'Delete',
      function: this.deleteTrack.bind(this)
    },
    {
      name:'Edit Name',
      function: this.onEditName.bind(this)
    },
    {
      name:'Select Sound',
      function: this.selectSound.bind(this)
    },
    {
      name:'Clear Track',
      function: this.clear.bind(this)
    },
  ]

  @ViewChild('selectSound') selectSoundComponent!: SelectSoundComponent;
  
  
  constructor(private audioContextService: AudioContextService, private assetService:AssetService){
    this.audioContextStateSubscription = this.audioContextService.getAudioContextStateObservable().subscribe((state) => {
      if (state === AudioContextState.Paused) {
        this.isPlaying = false;
        this.reset();
      }
    });
    this.fillArray(this.totalBeats, 4);
  }

  ngOnInit(){
    if(!this.trackName){
      this.trackName = 'Track '+this.id;
    }
  }

  onTrackNameChange(newName:string){
    this.trackName = newName;
  }


  play() {
    if (this.isPlaying) { // start playing
      this.nextBeatTime = this.audioContextService.getAudioContextTime();
        this.timerId = setInterval(()=>{
          this.scheduler()
        }, this.interval)
        window.requestAnimationFrame(this.updateDrawnBeat.bind(this)); 
    }
}

onEditName(event?: MouseEvent){
  console.log(this.editName);
  this.editName = true;
  console.log('what');
  console.log(this.editName);
  event?.stopPropagation();
}



clear(event?:MouseEvent){
  this.trackBeats = [];
  this.fillArray(this.totalBeats, 0);
}

reset(){
  clearInterval(this.timerId);
  setTimeout(() => {
    this.trackBeats[this.currentBeatDrawn].currentBeat = false;
    this.nextBeatTime = 0;
    this.currentBeat = 0;
    this.lastBeatDrawn = 0;
    this.currentBeatDrawn = 0;
    this.beatsInQueue = [];
  }, 0);
}

  scheduler(){
      while (this.nextBeatTime < this.audioContextService.getAudioContextTime() + this.scheduleAheadTime) {
        if(this.sound){
          this.beatsInQueue.push( { beat:this.currentBeat, time: this.nextBeatTime } );
          if(this.trackBeats[this.currentBeat].selected){
            this.audioContextService.scheduleSound(this.nextBeatTime, this.sound, this.soundId);
          }
          this.nextBeat();
        }
      }
      
  }

  nextBeat() {
    let secondsPerBeat = 60.0 / this.tempo;	// picks up the CURRENT tempo value!
    this.nextBeatTime += 4/this.beatsPerMeasure * secondsPerBeat;
    this.currentBeat++;	// Advance the beat number, wrap to zero
    if (this.currentBeat == this.totalBeats) {
      this.currentBeat = 0;
    }
  }

  fillArray(numElements:number, fillBeat:number){
    for (let i = 0; i < numElements; i++) {
      if(i % fillBeat == 0 ){
        this.trackBeats.push({ selected: true, currentBeat: false });
      }
      else{
        this.trackBeats.push({ selected: false, currentBeat: false});
      }
    }
  }

  updateTrackBeats(prevBeats:number, newBeats:number){
    if(prevBeats == undefined){
      prevBeats = 0;
    }
    if(prevBeats == newBeats){
      return;
    }
    if(prevBeats<newBeats){
      this.fillArray(newBeats-prevBeats, 4);
    }
    else{
      this.trackBeats.splice(newBeats-1, prevBeats-newBeats);
    }
  }


  updateDrawnBeat() {
    let currentTime = this.audioContextService.getAudioContextTime();
    while (this.beatsInQueue.length && this.beatsInQueue[0].time < currentTime && this.isPlaying) {
        this.currentBeatDrawn = this.beatsInQueue[0].beat;
        this.beatsInQueue.splice(0,1);   // remove note from queue
    }
    if(this.currentBeatDrawn != this.lastBeatDrawn && this.isPlaying){
      this.trackBeats[this.lastBeatDrawn].currentBeat = false;
      this.lastBeatDrawn = this.currentBeatDrawn;
      this.trackBeats[this.lastBeatDrawn].currentBeat = true;
    }
    if (this.isPlaying) {
      window.requestAnimationFrame(this.updateDrawnBeat.bind(this)); // Bind the context here and call recursively
    }
  }

  deleteTrack(event?:MouseEvent){
    this.onDelete.emit(this.id);
  }

  saveTrack(){
    let savedTrack = new SavedTrack();
    savedTrack = {
      soundId: this.soundId,
      trackName: this.trackName,
      selectedBeats: this.trackBeats.map((beat)=>{
        return beat.selected;
      })
    };
    return savedTrack;
  }

  async loadTrack(){
    let savedTrack = this.savedTrack;
    if(savedTrack){
      let soundFile = await this.assetService.getFile(savedTrack.soundId);
      console.log(soundFile);
      let sound;
      if(!soundFile){
        sound = this.audioContextService.loadEmptyBuffer();
      }
      else{
        sound = await this.audioContextService.loadAudioBuffer(soundFile);
      }
      this.updateSound({
        sound,
        soundId: savedTrack.soundId,
        name: savedTrack.trackName
      });
      savedTrack.selectedBeats.forEach((beat,index)=>{
        if(index < this.trackBeats.length){
          this.trackBeats[index].selected = beat;
        }
      });
    }
  }

  selectSound(event?:MouseEvent){
    this.selectSoundComponent.open();
  }

  updateSound(newSound?:any){
    console.log(newSound);
    if(newSound){
      this.sound = newSound.sound;
      this.trackName = newSound.name;
      this.soundId = newSound.soundId;
    }
    console.log(this.trackName);
  }


  ngOnChanges(changes:SimpleChanges){
    if(changes['totalBeats']){
      this.updateTrackBeats(changes['totalBeats'].previousValue, changes['totalBeats'].currentValue);
    }
    if(changes['isPlaying']){
      this.play();
    }
    if(changes['savedTrack']){
      console.log(changes);
      this.loadTrack();
    }
  }

  


  ngOnDestroy() {
    this.audioContextStateSubscription.unsubscribe();
  }
}
