import { Component } from '@angular/core';
import * as LottiePlayer from "@lottiefiles/lottie-player";
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

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

  landingPreHeader = "About me...";
  landingHeader = "Reilly McLaren";
  landingSubHeader = `I am a full-stack engineer passionate about creating tools that 
  don't already exist, and getting the tools that do exist to the right people.`;

  lottieOptions: AnimationOptions = {    
    path: '/assets/img/aboutMe/coding-lottie.json',
  };

  resume = '/assets/pdfs/Reilly_McLaren_Resume.pdf'
  leetCodeUsername = 'reiman_77';
  lottieStyle = {
    marginTop: '-150px',
  };

  constructor() { }  

  ngOnInit(): void {  }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {    
    animationItem.setSpeed(.7);
  }

  scrollToElement(id:string){
    var elmntToView = document.getElementById(id);
    if(elmntToView){
      console.log(elmntToView);
      elmntToView.scrollIntoView({behavior: "smooth"}); 

    }
  }

  openNewTab(link:string){
    window.open(link, '_blank');
  }
 
}
