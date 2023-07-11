import { Component } from '@angular/core';


@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.less']
})
export class AboutMeComponent {
  title = 'rmclaren-website';
  currentDate = new Date();
  currentDateString = this.currentDate.toISOString().split('T')[0];
  events: {}[] = [];


 
}
