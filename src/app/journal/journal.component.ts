import { Component } from '@angular/core';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.less']
})
export class JournalComponent {
  title = 'rmclaren-website';
  currentDate = new Date();
  currentDateString = this.currentDate.toISOString().split('T')[0];
  computeTimeSinceCreation(){
    let startDate = new Date("2023/01/01");
    let time_diff = this.currentDate.getTime() - startDate.getTime();
    time_diff = Math.floor(time_diff / (1000 * 3600 * 24));
    return time_diff;
  }
}
