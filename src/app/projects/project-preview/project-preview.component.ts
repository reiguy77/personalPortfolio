import { Component } from '@angular/core';

@Component({
  selector: 'project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.less']
})
export class ProjectPreviewComponent {

  projects:{title:string, difficulty:number, link:string, tags:string[], description: string, bullets:string[], imageUrl?:string}[] = [];


  constructor(){
    this.initializeProjects();
  }
 
  initializeProjects(){
    this.projects = [
      {
        difficulty: 3,
        title: "ThinkTrends Website",
        description: `My previous company did an overhaul on their website. 
                Under the CEO's direction I re-designed this site.`,
        link: 'https://thinktrends.co',
        bullets: ['Main site for machine learning company', 'Incorporated hubspot chat + forms', "Modernized the site's components"],
        tags: ["Javascript", "HTML", "CSS"],
        imageUrl: '/assets/img/projects/thinktrends/homepage.png' 
      },
      {
        difficulty: 3, 
        title: "Robinhood Stocks",
        description: `I had a desire to automate my investments, so I used a Robinhood 3rd-party API to link to my account
        and make trades daily following a certain set of rules.`,
        link: 'https://github.com/reiguy77/automated-trading/',
        bullets: ['Hosted on Heroku', 'Used RobinStocks API', '100% Python Script', "Took advantage of CRON Jobs", "Used SQLite to hold stock information", "Script ran every 5 minutes, daily"],
        tags: ['Python', 'Heroku', "SQLite"],
        imageUrl: '/assets/img/projects/robinhood/trades.png'
      },
      {
        difficulty: 4,
        title: "Personal Portfolio",
        description: `This is an attempt to document my experience as a software developer, as well as experiment with different technologies
        such as angular. Soon I hope it will encompass a more a holistic view of my life.`,
        link: 'https://github.com/reiguy77/personalPortfolio',
        bullets: ["First Major Angular Project", 'Learned Routing, Web Hosting', "Integrated Several APIs", "Used JIRA to manage the project", "Created many reusable components"],
        tags: ['Node.js', 'Angular', 'HTML', 'CSS/Less', 'server'],
        imageUrl: '/assets/img/projects/personal-website/progress-3.png',
      },
      {
        difficulty: 4,
        title: "MusArt Web Application",
        description: `The MusArt web application was created in the hopes of combining available audio and visual technology to be used for good.`,
        link: 'https://vtechworks.lib.vt.edu/handle/10919/103302',
        bullets: ['Solo Capstone Project', 'Used Vanilla JS ', 'Guided by Professor Fox and Professor Bukvic', 'Learned web audio players', 
        'Learned about creating a captivating experience'],
        tags: ['Javascript', 'HTML', 'CSS'],
        imageUrl: '/assets/img/projects/musart/presentation-cover.png'
      }
    ]
  }

}
