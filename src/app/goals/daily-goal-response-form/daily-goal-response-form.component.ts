import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ImageUploadService } from 'src/app/services/imageUploadService';
import { Goal } from '../goal/goal.component';

@Component({
  selector: 'app-daily-goal-response-form',
  templateUrl: './daily-goal-response-form.component.html',
  styleUrls: ['./daily-goal-response-form.component.less']
})

export class DailyGoalResponseFormComponent implements OnInit {
  @ViewChild('test', { read: ElementRef })
  test!: ElementRef;
  @Input() goal: Goal;
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();

  images: File [] | undefined = undefined;
  
  goalResponse: GoalResponse = new GoalResponse(-1, -1, false, new Date(), 0,  '', '', '', []);
  constructor(public element: ElementRef, private http: HttpClient, private imageUploadService: ImageUploadService) {
    this.element.nativeElement;
    this.goal = new Goal(1, 'Example Goal', 'This is an example task', 'daily', 5, 'To improve my skills', new Date(), new Date(), true);
   }

  ngOnInit(): void {
  } 

  closeModal(){
    this.show = false;

    this.showChange.emit(this.show);
  }

  ngOnChanges(changes: SimpleChanges) {

    this.updateDisplay(changes['show'].currentValue);
}

  onImageUploaded(files: File[]): void {
    this.images = files;
    console.log(files);
    console.log(typeof(files));
  }

  updateDisplay(show:Boolean){
    if(show){
      this.showModal();
    }
    else{
      this.closeModal();
    }
  }

  showModal(){
  }
  

  async submitResponse(){
    this.goalResponse.goalId = this.goal['_id'];
    if(this.goalResponse.timeComplete){
    this.goalResponse.timeComplete = new Date(this.goalResponse.timeComplete);
    }
    let imageIds: String[] = [];
    if(this.images){
      for (let i = 0; i < this.images.length; i++) {
        const res = await firstValueFrom(this.imageUploadService.submitImage(this.images[i]));
        console.log(res);
        imageIds.push(res._id);
      };
    }
    this.goalResponse.associatedImageIds = imageIds;
    let url = 'http://localhost:8080/api/goalResponse/';
    console.log(this.goalResponse);
    this.http.post(url, this.goalResponse).subscribe(data => {
      console.log(data);
   });
    this.closeModal();
  }
  
  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.show = false;
          }
      }
  }

}


export class GoalResponse{

  _id: Number;
  goalId: Number;
  success: Boolean;
  timeComplete?: Date;
  duration?: Number;
  madeTaskEasyText?: String;
  madeTaskHardText?: String;
  accomplishmentText?: String;
  associatedImageIds?: String[];
  createdAt?: Date;

  constructor(_id:Number, goalId:Number, success:Boolean, timeComplete?:Date, duration?:Number, madeTaskEasyText?: String,
    madeTaskHardText?: String, accomplistmentText?:String, associatedImageIds?: String[]) { 
    this._id = _id;
    this.goalId = goalId;
    this.success = success;
    this.duration = duration;
    this.madeTaskEasyText = madeTaskEasyText;
    this.madeTaskHardText = madeTaskHardText;
    this.timeComplete = timeComplete;
    this.accomplishmentText = accomplistmentText;
    this.associatedImageIds = associatedImageIds;

  }

}