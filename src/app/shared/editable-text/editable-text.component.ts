import { Component, Input, Output, EventEmitter, SimpleChange, Renderer2, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('text') text!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  onEnterKeyPressed(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      
      this.finishedEditing();
    }
  }

  constructor(private renderer: Renderer2) {
    /**
     * This events get called by all clicks on the page
     */

    this.renderer.listen('window', 'mousedown',(e:Event)=>{
         /**
          * Only run when toggleButton is not clicked
          * If we don't check this, all clicks (even on the toggle button) gets into this
          * section which in the result we might never see the menu open!
          * And the menu itself is checked here, and it's where we check just outside of
          * the menu and button the condition abbove must close the menu
          */
        if(this.text && e.target === this.text.nativeElement){
            this.edit = true;
        }
        if(this.input){
            if(e.target == this.input.nativeElement){

              e.stopPropagation(); 
            }
            else{
              this.finishedEditing();
            }
        }
        // if(e.target !== this.input.nativeElement && this.edit){
        //   this.finishedEditing();
        // }
    });
  }
  finishedEditing(){
    this.edit = false;
    this.onFinishedEditing.emit(this.edit);
  }
}