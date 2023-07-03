import { Component } from '@angular/core';
import { StatusService } from './shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  status = 'DOWN';
  constructor(private statusService: StatusService) { }
  title = 'rmclaren-website';
  onInit(){

  this.statusService.getStatus().subscribe(res=>{
    console.log(res);
  });
  }
}
