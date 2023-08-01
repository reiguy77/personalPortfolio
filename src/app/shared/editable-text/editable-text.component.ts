import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import * as uuid from 'uuid'
@Component({
  selector: 'editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.less']
})
export class EditableTextComponent {
  @Input() value: string = '';
  @Input() edit: boolean = false;
  @Output() onFinishedEditing: EventEmitter<boolean> = new EventEmitter<boolean>();
  onEnterKeyPressed(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      this.edit = false;
      this.finishedEditing();
    }
  }
  finishedEditing(){
    this.onFinishedEditing.emit(this.edit);
  }
}