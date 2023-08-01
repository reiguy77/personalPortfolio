import { Component } from '@angular/core';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.less']
})


export class MetronomeComponent {
  audioContext:any;
  unlocked = false;
  isPlaying = false;      // Are we currently playing?
  startTime = 0;                 
  lookahead = 25.0;       // How frequently to call scheduling function 
                            //(in milliseconds)
  interval = 100;
  scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                            // This is calculated from lookahead, and overlaps 
                            // with next interval (in case the timer is late)
  noteLength = 0.05;      // length of "beep" (in seconds)
  canvas:any;                // the canvas element
  canvasContext:any;          // canvasContext is the canvas' context 2D
  lastNoteDrawn = 1; // the last "box" we drew on the screen
  timerWorker = null;     // The Web Worker used to fire timer messages
  choosingBeat = false;
  nextNoteTime = 0; // When the next note is due
  tempo = 60;
  currentNote = 0;
  noteValue = 16;
  notes:{ [key in string]: number } =  {
    'sixteenth':16,
    'eighth':8,
    'quarter':4,
    'half':2,
    'whole':1
  }
  noteOptions = Object.keys(this.notes);
  notesInQueue:{note:number, time:number}[] = [];
  timerId:any;
  requestAnimFrame:any;

  ngOnInit(){
    // First, let's shim the requestAnimationFrame API, with a setTimeout fallback
   this.requestAnimFrame = window.requestAnimationFrame;
   let container = document.createElement( 'div' );
    container.className = "container";
    this.canvas = document.createElement( 'canvas' );
    this.canvasContext = this.canvas.getContext( '2d' );
    this.canvas.width = window.innerWidth; 
    this.canvas.height = window.innerHeight; 
    document.body.appendChild( container );
    container.appendChild(this.canvas);    
    this.canvasContext.strokeStyle = "#ffffff";
    this.canvasContext.lineWidth = 2; 
    window.onresize = this.resetCanvas;
    this.lastNoteDrawn = 16;
    
    window.requestAnimationFrame(this.draw);  // start the drawing loop.
  }

  scheduleNote( beatNumber:number, time:number ) {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push( { note: beatNumber, time: time } );

    if ( (this.noteValue == 8) && (beatNumber%2))
        return; // we're not playing non-8th 16th notes
    if ( (this.noteValue == 4) && (beatNumber%4))
        return; // we're not playing non-quarter 8th notes

    // create an oscillator
    let osc = this.audioContext.createOscillator();
    osc.connect( this.audioContext.destination );
    if (beatNumber % 16 === 0)    // beat 0 == high pitch
        osc.frequency.value = 110.0;
    else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
        osc.frequency.value = 120.0;
    else                        // other 16th notes = low pitch
        osc.frequency.value = 130.0;

    osc.start( time );
    osc.stop( time + this.noteLength );
  }


  scheduler(){
      // while there are notes that will need to play before the next interval, 
      // schedule them and advance the pointer.
      while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
          this.scheduleNote( this.currentNote, this.nextNoteTime );
          this.nextNote();
      } 
  }

  play() {
    if (!this.audioContext)
        this.audioContext = new AudioContext();

    if (!this.unlocked) {
      // play silent buffer to unlock the audio
      var buffer = this.audioContext.createBuffer(1, 1, 22050);
      var node = this.audioContext.createBufferSource();
      node.buffer = buffer;
      node.start(0);
      this.unlocked = true;
    }

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) { // start playing
        this.currentNote = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        this.timerId = setInterval(()=>{this.scheduler()},this.interval)
    } else {
        this.reset();
    }
  }

  reset(){
    clearInterval(this.timerId);
    this.notesInQueue = [];
  }


  nextNote() {
    let secondsPerBeat = 60.0 / this.tempo;	// picks up the CURRENT tempo value!
    this.nextNoteTime += 4/this.noteValue * secondsPerBeat;	
  
    this.currentNote++;	// Advance the beat number, wrap to zero
    if (this.currentNote == this.noteValue) {
      this.currentNote = 0;
    }
  }


  draw = () => {
    let currentNote = this.lastNoteDrawn;
    if (this.audioContext) {
        let currentTime = this.audioContext.currentTime;

        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            currentNote = this.notesInQueue[0].note;
            this.notesInQueue.splice(0,1);   // remove note from queue
        }

        // We only need to draw if the note has moved.
        if (this.lastNoteDrawn != currentNote) {
            let x = Math.floor( this.canvas.width / 18 );
            this.canvasContext.clearRect(0,0,this.canvas.width, this.canvas.height); 
            for (let i=0; i<16; i++) {
                this.canvasContext.fillStyle = ( currentNote == i ) ? 
                    ((currentNote%4 === 0)?"red":"blue") : "white";
                this.canvasContext.fillRect( x * (i+1), x, x/2, x/2 );
            }
            this.lastNoteDrawn = currentNote;
        }
    }
    // set up to draw again
    window.requestAnimationFrame(this.draw);
}

  resetCanvas () {
    // resize the canvas - but remember - this clears the canvas too.
    if(this.canvas){
      this.canvas.width = window.innerWidth * .5;
      this.canvas.height = window.innerHeight *.5;
    }

    //make sure we scroll to the top left.
    window.scrollTo(0,0); 
  }

  noteTypeSelected(noteType:string){
    this.noteValue = this.notes[noteType];
  }

  updateTempo(value:number) {
    this.tempo = value;
  }
}
