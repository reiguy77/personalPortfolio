import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AssetService } from 'src/app/services/asset-service.service';
import { AudioContextService } from '../audio-context.service';

@Component({
  selector: 'select-sound',
  templateUrl: './select-sound.component.html',
  styleUrls: ['./select-sound.component.less'],
  providers: [AssetService]
})
export class SelectSoundComponent {
  
existingFiles:any[] = [];
newFile?:File;
addedFile: boolean = false;
soundId: string = '';
selectedId = -1;

@Input() sound?:AudioBuffer;
@Output() onNewSoundSelected:EventEmitter<{sound:AudioBuffer, name:string, soundId: string}> = new EventEmitter();

@ViewChild('content') modalContent!: TemplateRef<any>;

constructor(private assetService: AssetService, private modalService:NgbModal, private audioContextService:AudioContextService){}
modalReference?:NgbModalRef;
subfolderPath = 'audio/public';

  async open(){
    await this.getFileNames();
    this.modalReference = this.modalService.open(this.modalContent, { centered: true });
  }

  async save(){
    if(this.newFile){
      if(this.addedFile){
        this.soundId = await this.addFile();
      }
      this.sound = await this.audioContextService.loadAudioBuffer(this.newFile);
      if(this.sound){
        this.onNewSoundSelected.emit({sound:this.sound, name:this.newFile.name, soundId: this.soundId});
      }
    }
    this.modalReference?.close();
  }

  selectExistingSound(index: number){
    this.selectedId = index;
    let file = this.existingFiles[index];
    let id = file.id; 
    this.getSoundFile(id);
    this.soundId = id;
    this.clearInput();
  }

  clearInput(){
    let input = document.getElementById('file_input') as HTMLInputElement;
    if(input){
      input.value = '';
    }
    // this.inputComponent.nativeElement.value = "";
  }

  async getSoundFile(id:string){
    this.newFile = await this.assetService.getFile(id);
  }

  async getFileNames(){
    this.existingFiles = await this.assetService.getFileNames(this.subfolderPath);
  }

  async addFile(){
    const subfolderPath = 'audio/public';
    if(this.newFile){
      let resp = await this.assetService.addFiles(subfolderPath, [this.newFile]);
      console.log(resp);
      return resp[0].id;
    }
  }

  onFileChange(event:any){
    this.newFile= event.target.files[0];
    this.addedFile = true;
    this.selectedId = -1;
  }






}
