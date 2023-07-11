import { Component } from '@angular/core';

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.less']
})
export class SkillsComponent {

  mySkills:{skill:string, percent:number}[] = [
    {
      'skill':'Javascript (Node.js)',
      'percent': 85
    },
    {
      'skill':'Python',
      'percent': 75
    },
    {
      'skill':'DevOps',
      'percent': 40
    },
    {
      'skill':'Docker',
      'percent': 60
    },
    {
      'skill':'Elastic',
      'percent': 70
    },
    {
      'skill':'SQL',
      'percent': 50
    }
  ]

}
