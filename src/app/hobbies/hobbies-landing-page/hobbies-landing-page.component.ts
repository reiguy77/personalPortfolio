import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hobbies-landing-page',
  templateUrl: './hobbies-landing-page.component.html',
  styleUrls: ['./hobbies-landing-page.component.less']
})
export class HobbiesLandingPageComponent implements OnInit {
  constructor(private http: HttpClient) { }
  goals: any;
  title = 'Hobbies';
  sections = ["music", "exercise", "education"];
  description = "This is a brief description of what would be in a description";
  link = "https://days.to/until/christmas";
  text = "this is a test";
  sectionInformation = this.sections.map((section)=>{
    return this.getSectionInformation(section)
  });

  table = [    { header: 'Column 1', cells: ['A1', 'A2', 'A3'] },
    { header: 'Column 2', cells: ['B1', 'B2', 'B3'] },
    { header: 'Column 3', cells: ['C1', 'C2', 'C3'] },
  ];
  
  ngOnInit(){
    this.getAllGoals();
  }

  getAllGoals(){
    let url = 'http://localhost:8080/api/goal/';

    this.http.get(url).subscribe(data=>{
      console.log(data);
      this.goals = data;
    })
  }
  getSectionInformation(section:string){
    let subsections:string[] = [];
    switch(section){
      case "music":
        subsections = ["saxophone", "piano"];
        // getSubsections
        break;
      default:
        subsections = [];
    }
    // Search through folder structure - remove folder containing "hobbies"
    // Get subsections - education, exercise, music, etc. 
    // Get json from each subsection
    //
  }
  testAPI() {
    let url = 'http://localhost:8080/api/hobby/';
    let deleteByIdUrl = 'http://localhost:8080/api/hobby/63e06094b40ed6e31e561c17'
    // console.log(url)
    this.http.post(url, {
      "title": "Piano",
      "description": "",
      "startDate": "",
      "tags": ["Music", "Creativity", "Math"],
      "influences": [
          "Miles Davis",
          "Bill Evans",
          "Keith Ebeltoft",
          "Pianist from The Doors",
          "Herbie Hancock"
      ]
  }).subscribe(data => {
      console.log(data);
   });
//   this.http.post(url).subscribe(data => {
//     console.log(data);
//  });

  }




openGoalFormModal(){
  let modal = document.getElementById("myModal");
  if(modal != null){
    modal.style.display = "block";
  }
  window.onclick = function(event) {
    let modal = document.getElementById("myModal");
       if (event.target == modal && modal != null) {
         modal.style.display = "none";
       }
     }
  }
closeGoalFormModal(){
  let modal = document.getElementById("myModal");
  if(modal != null){
    modal.style.display = "none";
  }
}

  



}
