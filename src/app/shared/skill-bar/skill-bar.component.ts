import { Component, Input } from '@angular/core';
import * as uuid from 'uuid'
@Component({
  selector: 'skill-bar',
  templateUrl: './skill-bar.component.html',
  styleUrls: ['./skill-bar.component.less']
})
export class SkillBarComponent {

  @Input() color?: string;
  @Input() percent: number = 0;
  @Input() skill: string = '';
  barId:string; 
  percentId:string;

  constructor(){
    let componentId = uuid.v4();
    this.barId = componentId+'_skill-bar';
    this.percentId = componentId+'_percent';
  }
  
  ngAfterViewInit(){
      let skill = document.getElementById(this.barId);
      let percent = document.getElementById(this.percentId);
      if(skill){
        if(this.color){ 
          skill.style.background = this.color;
        }
        skill.style.width = this.percent + '%';
      }
      if(percent){
        percent.style.left = (this.percent-5)+'%';
      }
  }
}
