import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less']
})
export class ColorPickerComponent {

  @Input() changeFunction:Function = ()=>{};
  @Input() color: string = '#FFFFFF';
  @Output() colorChange: EventEmitter<any> = new EventEmitter();


  onColorChange() {
    this.colorChange.emit(this.color);
  }


}
