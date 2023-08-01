import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'selector-buttons',
  templateUrl: './selector-buttons.component.html',
  styleUrls: ['./selector-buttons.component.less']
})
export class SelectorButtonsComponent {
  @Input() items:string[]= [];
  @Input() selected:string = '';
  @Input() multiSelect?:boolean = false;
  @Output() buttonClicked = new EventEmitter<string>();

  options:{name:string, selected:boolean}[] = [];

  ngOnInit(){
    this.options = this.items.map((item)=>{
      if(this.selected){
        if(item == this.selected){
          return {
            name:item,
            selected:true
          }
        }
      }
      return({
        name:item,
        selected:false
      })
    })
  }

  updateSelected(name:string){
    this.options.forEach((item, index, arr)=>{
      if(item.name == name){
        arr[index].selected = true;
      }
      else{
        if(!this.multiSelect){
          arr[index].selected = false;
        }
      }
    });
    this.buttonClicked.emit(name);
  }
}
