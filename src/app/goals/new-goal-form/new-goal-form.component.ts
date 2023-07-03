import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'new-goal-form',
  templateUrl: './new-goal-form.component.html',
  styleUrls: ['./new-goal-form.component.less']
})
export class GoalFormComponent {

  constructor(private http: HttpClient) { }
    model = {
        title:'',
        endDate:new Date().getDate(),
        startDate:new Date().getDate(),
        why: '',
        duration: '',
        frequency: '',
        task: ''
    };



  closeGoalFormModal(){
    let modal =  document.getElementById("myModal");
    if(modal){
        modal.style.display = "none";
    }
  }
  submitNewGoal(){
    let url = 'http://localhost:8080/api/goal/';
    this.http.post(url, this.model).subscribe(data => {
      console.log(data);
      this.closeGoalFormModal();
   });
  }
}
