import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'social-media-links',
  templateUrl: './social-media-links.component.html',
  styleUrls: ['./social-media-links.component.less']
})
export class SocialMediaLinksComponent {

  @Input() size?: number;
  @Input() background?: 'light' | 'dark';

  githubLottieOptions: AnimationOptions = {
    path: '/assets/img/socialMedia/github-moving.json'
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }


  constructor(){

  }

}
