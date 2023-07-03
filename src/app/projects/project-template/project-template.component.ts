import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.less']
})
export class ProjectTemplateComponent {

  @Input() title: String = 'Title';
  @Input() description: String = 'Description';
}
