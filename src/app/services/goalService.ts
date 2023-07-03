import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Goal } from "../goals/goal/goal.component";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class GoalService {

    constructor (private http: HttpClient){

    }
    private myData: string[] = ['foo', 'bar', 'baz'];
  
    getData(): string[] {
      return this.myData;
    }
  
    addData(newData: string) {
      this.myData.push(newData);
    }

      
  }