import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'select-saved-rhythm',
  templateUrl: './select-saved-rhythm.component.html',
  styleUrls: ['./select-saved-rhythm.component.less']
})
export class SelectSavedRhythmComponent {
  file?:any;
  fileContent?:any;
  savedRhythm:{} = {};
  modalReference?:NgbModalRef;
  @ViewChild('content') modalContent!: TemplateRef<any>;
  @Output() onUploadSavedRhythm:EventEmitter<any> = new EventEmitter();

  constructor(private modalService:NgbModal){}
  open(){
    this.modalReference = this.modalService.open(this.modalContent, { centered: true });
  }
  close(){
    this.modalReference?.close();
  }
  // fileReader:FileReader = new FileReader();
  async onFileChange(event: any){
      this.file = event.target.files[0];
      this.fileContent = await this.readFileContent(this.file);
  }


  async readFileContent(file:File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            resolve(event?.target?.result);
        };

        reader.onerror = function (event) {
            reject(event?.target?.error);
        };

        reader.readAsText(file);
    });
  }
  upload(){
    if(this.fileContent){
      this.savedRhythm = JSON.parse(this.fileContent);
      this.onUploadSavedRhythm.emit(this.savedRhythm);
    }
    this.close();

  }
}
