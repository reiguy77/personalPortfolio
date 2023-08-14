// audio-context.service.ts

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioContextService implements OnDestroy{
  private audioContext: any;
  audioSourceNodeByBufferId: any = {};
  audioContextStateSubject: Subject<AudioContextState>;
  buffers:any[] = [];
  constructor() {
    this.audioContext = new AudioContext();
    this.audioContextStateSubject = new Subject<AudioContextState>();
  }

  stop() {
    this.closeAudioContext();
    this.audioContextStateSubject.next(AudioContextState.Paused);
    this.buffers.forEach((buffer)=>{
      buffer.disconnect();
    })
    this.buffers = [];
  }

  start() {
    this.checkAudioContext()
    this.audioContextStateSubject.next(AudioContextState.Running);
  }

  // Method to start the audio
  playAudio(buffer: AudioBuffer) {
    this.checkAudioContext();
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start();
  }

  checkAudioContext(){
    if(!this.audioContext){
      this.audioContext = new AudioContext();
    }
    else{
      this.audioContext.resume();
    }
  }

  async loadAudioFile(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return await this.audioContext.decodeAudioData(buffer);
  }
  async loadAudioBuffer(file: File): Promise<AudioBuffer> {

    let arrayBuffer = await file.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }

  async loadEmptyBuffer(){
    return await this.audioContext.createBuffer(2, 22050, 44100);
  }

  getAudioContextTime(){
    this.checkAudioContext();
    return this.audioContext.currentTime;
  }


  scheduleSound( time:number, buffer?:AudioBuffer, bufferId?:string, noteLength: number = .5) {
    if(!this.audioContext){
      this.audioContext = new AudioContext();
    }
    if(buffer){
      let source;
        source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start(time);
        source.stop(time + noteLength);
        this.buffers.push(source);
    }
  }

  closeAudioContext() {
    if (this.audioContext) {
      this.audioContext.suspend();
      this.audioContext.close().then(() => {
        this.audioContext = null;
      });
    }
  }

getAudioContextStateObservable() {
    return this.audioContextStateSubject.asObservable();
  }

  ngOnDestroy() {
    // Disconnect and stop all active audio sources
    if(this.audioContext){
      this.audioContext.suspend();
      this.audioContext.close().then(() => {
        console.log('AudioContext closed');
      });
    }
   
  }
}

export enum AudioContextState {
  Running,
  Paused,
}