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
      'percent': 80
    },
    {
      'skill':'Java',
      'percent': 75
    },
    {
      'skill':'Docker',
      'percent': 70
    },
    {
      'skill':'HTML/CSS',
      'percent': 85
    },
  ]

}
