import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Chart, { ChartOptions } from 'chart.js/auto'
import { firstValueFrom, Timestamp } from 'rxjs';
import { GoalResponseService } from 'src/app/services/goalResponseService';
import { ImageUploadService } from 'src/app/services/imageUploadService';
import { GoalResponse } from '../daily-goal-response-form/daily-goal-response-form.component';
import {DomSanitizer} from '@angular/platform-browser';
const reader = new FileReader();

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.less']
})





export class GoalComponent implements OnInit {
  @Input() goal: Goal;
  showGoalResponseForm = false;
  allGoalResponses: GoalResponse[] = []; 
  allGoalImages: String[] = [];
  currentGoalImageId: String = '';
  chartData: any = [];
  chartLabels :any = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
      }
    }
  };
  chart: any;
  
  constructor(private http: HttpClient, private goalResponseService: GoalResponseService, private imageUploadService: ImageUploadService,
    private sanitizer:DomSanitizer) {
    this.goal = new Goal(1, 'Example Goal', 'This is an example task', 'daily', 5, 'To improve my skills', new Date(), new Date(), true);
  }

  ngOnInit(): void {
    this.getGoalResponses();
  }  

  async getGoalResponses() {
    this.allGoalResponses = await firstValueFrom(this.goalResponseService.getGoalResponses(this.goal._id));
  }

  async getGoalResponseImage(goalResponseId:String) {
    let goalResponse = this.allGoalResponses.find((goalResponse)=>{
      return String(goalResponse._id) == goalResponseId;
    });
    let images:String[]= []
      if(goalResponse && goalResponse.associatedImageIds){
        const tempImages = await firstValueFrom(this.imageUploadService.getImages(goalResponse.associatedImageIds));
        tempImages.forEach((image:any)=>{
          const imageUrl = this._arrayBufferToDataURI(image.data.data);
          images.push(imageUrl);
        })
      }
      return images;
  }

 
  

  async onPointHover(event : any) {
    const goalResponseData = event.active[0].element.$context.raw;
    const goalResponseId = goalResponseData.id;
    console.log(goalResponseData);
    if(!goalResponseId || goalResponseId == this.currentGoalImageId){
      return;
    }
    let imageUrl = await this.getGoalResponseImage(goalResponseId);
    
    this.currentGoalImageId = goalResponseId;
  }

  setChartData() {
    if(this.allGoalResponses.length){
      const values = this.allGoalResponses.map(d => {
        return {'x': d.createdAt, 'y': d.duration, 'id':d._id}
      });
      console.log(values);
      this.chartData.push({
        values: values,
        label: 'Minutes Well Spent'
      });
    }
  }

sanitize( url:string ) {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

  _arrayBufferToDataURI( buffer : Buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return 'data:image/png;base64, '+window.btoa( binary );
  }
  
  async ngOnChanges() {
    await this.getGoalResponses();
    this.setChartData();
  } 


  
} 

export class Goal {
  _id: Number;
  title: String;
  task: String;
  frequency: String;
  duration: Number;
  why: String;
  startDate: Date;
  endDate: Date;
  active?: Boolean;


  constructor(_id:Number, title: String, task:String, frequency:String, 
    duration: Number, why: String, startDate:Date, endDate: Date, active?: Boolean) { 
    this._id = _id;
    this.title = title;
    this.task = task;
    this.frequency = frequency
    this.duration = duration; 
    this.why = why;
    this.startDate = startDate;
    this.endDate = endDate;
    this.active = active; 
  }
}