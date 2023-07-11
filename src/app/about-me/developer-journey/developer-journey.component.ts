import { Component } from '@angular/core';
import { NgxTimelineEvent, NgxTimelineEventGroup, NgxTimelineEventChangeSideInGroup, NgxDateFormat, NgxTimelineItemPosition } from '@frxjs/ngx-timeline';

@Component({
  selector: 'developer-journey',
  templateUrl: './developer-journey.component.html',
  styleUrls: ['./developer-journey.component.less']
})
export class DeveloperJourneyComponent {
  events: {}[] = [];


  options = {
    groupBy: NgxTimelineEventGroup.YEAR,
    changeSide:  NgxTimelineEventChangeSideInGroup.ALL,
    reverseOrder: false,
  }

  ngOnInit(){
    this.initEvents();
  }


  private initEvents(): void {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    this.events = [
      { id: 0, description: `My freshman year Thomas Jefferson High School for Science and Technology(TJHSST), I took an intro to Computer Science class. 
        This started the journey, and that is a big part of the reason I am here today, working on this website`, 
        timestamp: new Date('09/01/2013'), 
        title: 'Began Learning How to Code',
        icon: 'assets/img/aboutMe/tj.png'
      
      },
      { id: 1, description: `I graduated from TJHSST, with the fortune of getting to speak at graduation.
        Of course a lot happened over those four years, but no need to bore you with the details.`, 
        timestamp: new Date('06/15/2017'), 
        title: 'Graduated From TJHSST',
        icon: 'assets/img/aboutMe/tj.png'
       },
       { id: 2, description: `I began my courses at Virginia Tech - notable classes included Cryptography - Numerical Analysis -
       Issues in Scientific Computing - Cloud Computing - Multimedia, Hypertext & Information Access Capstone with Professor Fox - Advanced Combinatorics - 
       Computer Music & Multimedia. During my time there I joined the Student Engineers' Council, holding the roles of Leadership in Engineering 
       Conference Chair and Information Management Chair, handling the software that the club maintained.  `, 
        timestamp: new Date('08/23/2017'), title: 'Began University',
      icon:'assets/img/aboutMe/vt.png' },
      { id: 3, description: `During my time at Virginia Tech I joined the Student Engineers' Council, holding the roles of Leadership in Engineering 
       Conference Chair and Information Management Chair, handling the software that the club maintained. `, 
        timestamp: new Date('02/01/2018'), title: 'Got Involved',
      icon:'assets/img/aboutMe/sec.png' },

      { id: 4, description: `I landed my first software engineer internship the summer after my sophomore year. I worked on the Streamlined Deployments team, 
      using Sail(Appian's in-house language) and Java to work on the deployment wizard used to deploy the Appian applications. I had some fantastic mentors here!`, 
      timestamp: new Date('06/01/2019'), title: 'First Internship - Appian',
      icon:'assets/img/aboutMe/appian.png' },
      { id: 5, description: `My junior year, I became president of the Association for Computing Machinery at Virginia Tech. As President, I introduced
        several new events and resources such as the CS Department Round Table, and the Works of Wonders Showcase to allow students to present their impressive
        side projects to companies. My efforts were recognized in 2021, when I received the Computer Science Service Award.`, 
        timestamp: new Date('09/01/2019'), title: 'Got More Involved',
        icon:'assets/img/aboutMe/acm.png' },
      { id: 6, description: `In a cloud computing class, I worked on a National Park Web Application in a group of four, using various APIs to display information
        about all of the United States National Parks. It gave me good insight into modular design, as for each National Park we used the same template and pulled 
        related information from twitter, weather.com, etc.`, 
        timestamp: new Date('05/01/2019'), title: 'First Large Scale Project',
      icon:'assets/img/aboutMe/national-park.png' },

      { id: 7, description: `For my capstone project, I was the only one in my class to pursue a project of my own design. This brought many challenges and difficulties, and
      I quickly discovered how difficult it is to program without a clear picture of the end-product in mind. I created an audio-visual web-app in vanilla javascript, HTML/CSS, using
      sound and visual javascript libraries to produce an interactive, therapeutic tool. Over weeks of iterating through ideas it turned into something decent, and there were 
      many ideas that I hope to one day return to.`, 
        timestamp: new Date('01/01/2021'), title: 'Hypertext & Multimedia Capstone Project',
      icon:'assets/img/aboutMe/music.png' },



      { id: 8, description: `I graduated from Virignia Tech Summa Cum Laude with a 3.93 GPA - 
        earning a double major in Computer Science and Applied Discrete Mathematics`, 
        timestamp: new Date('05/14/2021'), title: 'Graduated from Virginia Tech',
      icon:'assets/img/aboutMe/vt.png' },
      
      { id: 9, description: `I spent several months traveling throughout Europe after graduating, volunteering 
      in various locations through a program called workaway. I carried my saxophone and a hiker's backpack, and 
      traveled throughout Spain, France, Germany, and Turkey. I stayed on farms, working in the fields, in hostels, helping
      to provide guests a wonderful stay, and worked in a lab, creating a water measurement system using node-red along with
      turbines and IOT microprocessors.`, 
        timestamp: new Date('09/16/2021'), title: 'Volunteered through Workaway',
      icon:'assets/img/aboutMe/workaway.png' },

      { id: 10, description: `I began thinking of the idea of automating my robinhood investments after reading through some investment
      books. I realized that a lot of gains were not being taken advantage of, since I would buy and hold while there were lots of opportunities
      to sell the stocks after they had made some gains. I used a third-party robinhood api to gather my holdings and trade the stocks that had reached
      a certain threshold. This was all automated in a python application, which I hosted on Heroku. I made sure to calculate how much would be 
      lost due to taxes and account that in my strategy. So far it's done >10,000 trades!`, 
        timestamp: new Date('01/01/2022'), title: 'Automated Investing App',
      icon:'assets/img/aboutMe/robinhood.png' },

      { id: 11, description: `Michael Misovec, founder of BlochSoft Technologies, gave me the amazing opportunity to partner with him in 
      his venture. I was able to contribute by enhancing some aspects of the website, as well as providing crucial solar data to researchers
      using a solar API. I also significantly contributed to the acceptance of BlochSoft into the Climate Technology Open Accelerator. `,
        timestamp: new Date('01/01/2022'), title: 'Entering Climate Space - Partner',
      icon:'assets/img/aboutMe/blochsoft.png' },

      { id: 12, description: `I joined ThinkTrends in the beginning of 2022 as one of four Core Engineers working on the platform. At ThinkTrends,
      I was able to contribute very early on, working on pieces of the platform such as editing capabilities, audit features, autocorrect services, 
      fuzzy match systems. I helped to implement CI/CD for several of our microservices, worked on end-to-end testing, deployed our product to the Production
      Environment for our FDA clients, worked on dashboards containing visualizations, and helped to overhaul the company website in preparation for a large ad 
      campaign. It was an incredible amount of experience in a short amount of time - however at the end I was ready to move on from working remotely, 
      looking for a job in person or hybrid.`,
        timestamp: new Date('03/15/2022'), title: 'ThinkTrends - Full Stack Engineer',
      icon:'assets/img/aboutMe/thinktrends.png' },

      { id: 13, description: `This is my first large scale project using Angular, which has become very fun to use. Once I got the hang of it, it's helped
      to simplify a lot of the development process, especially when I have a plan of how the component hierarchy will be formed. 
      The most frustrating part is the CSS formatting, as CSS will forever torment me. However as of the time of writing 
      this I'm very happy with how it has come together. `,
        timestamp: new Date('01/01/2023'), title: 'Building this Website',
      icon:'assets/img/aboutMe/personal-website.png' },
    ];
  }
}
