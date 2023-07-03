import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent {
  title = 'rmclaren-website';
  currentDate = new Date();
  currentDateString = this.currentDate.toISOString().split('T')[0];

  computeTimeSinceCreation(){
    let startDate = new Date("2023/01/01");
    console.log(this.currentDate);
    let time_diff = this.currentDate.getTime() - startDate.getTime();
      
    // To calculate the no. of days between two dates
    time_diff = Math.floor(time_diff / (1000 * 3600 * 24));

    return time_diff;
  }

  
}
