import { Component, Input } from '@angular/core';

@Component({
  selector: 'beat',
  templateUrl: './beat.component.html',
  styleUrls: ['./beat.component.less']
})
export class BeatComponent {
  @Input() on = false;
  @Input() value = 0;


  
  toggle(){
    this.on = !this.on;
  }

}
