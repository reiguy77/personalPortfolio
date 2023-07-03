import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  title = 'rmclaren-website';
  websiteProjectDifficulty = 5; 
  projects = [
    {
      title: 'Personal Website',
      difficulty: 5,
      url: '/projects/websiteUrl',
      description: "I started this project in 2023, and it's what inspired me to do all of the others. As with all of these projects, there were a lot of nuances that I hadn't expected. It brought me a lot of familiarity about css, as well as using angular and focusing on building components."
    },
    {
      title: 'Robinhood Stocks',
      difficulty: 2,
      url: '/projects/websiteUrl',
      description: "Most of this project was completed in the beginning of 2022 since I had a lot of free time before getting a job. I wanted to see if I could implement a semi-random automatic trading scheme, so I set out to use some unofficial libraries. "
    },
  ] 
  link = "/hobbies";
  text = "this is a test";

  landingHeader='Welcome...'
  landingSubHeader = 'Take a look around and see if anything catches your interest.';

  openImage() {
    console.log('Showing image in popup');
  }
}
