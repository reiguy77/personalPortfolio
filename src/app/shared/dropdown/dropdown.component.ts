import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less']
})
export class DropdownComponent {
  @Input() title: string = '';
  @Input() options:{name:string, function:(args:any)=>void}[] = [];
  showDropdown: boolean = false;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if(this.showDropdown){
      console.log('HELLO!');
      this.showDropdown = false;
    }
  }

  toggleDropdown(event:MouseEvent){
    console.log('hey')
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  callFunction(func: (args:any)=>void, event:MouseEvent){
    this.showDropdown = false;
    func(event);
  }

}
