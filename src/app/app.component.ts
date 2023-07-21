import { Component } from '@angular/core';
import { StatusService } from './shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  status = 'DOWN';
  constructor(private statusService: StatusService) {

   
   }

  title = 'rmclaren-website';
  
  onInit(){
    const background = document.querySelector(".shiny") as HTMLElement;;

  background?.addEventListener("mousemove", (e) => {
    const { x, y } = background.getBoundingClientRect();
    background.style.setProperty("--x", ''+(e.clientX - x));
    background.style.setProperty("--y", ''+(e.clientY - y));
    console.log('hello');
  });

  this.statusService.getStatus().subscribe(res=>{
    console.log(res);
  });
  }
}
