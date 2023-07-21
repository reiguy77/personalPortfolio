
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GoalResponse } from "../goals/daily-goal-response-form/daily-goal-response-form.component";
import { Goal } from "../goals/goal/goal.component";
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class GoalResponseService {

    constructor (private http: HttpClient){

    }

    addGoalResponse (goalResponse: GoalResponse): Observable<any>{
        let url = `${environment.server.protocol}://${environment.server.host}/api/goalResponse/`;
        return this.http.post(url, goalResponse);
    }

    getGoalResponses(goalId: Number): Observable<any>{
        let url = `${environment.server.protocol}://${environment.server.host}/api/goalResponse/goalId/${goalId}`;
        return this.http.get(url);
    }
      
  }

