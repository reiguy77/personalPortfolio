import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.less']
})
export class HeroImageComponent {

  constructor(private http: HttpClient) { }


  @Input() imageUrl = '';
  @Input() header = '';
  @Input() subHeader = '';
  @Input() tint: 'light' | 'dark' |'none' = 'none';

  darkTint = 'rgba(0, 0, 0, 0.8)';
  lightTint= 'rgba(255, 255, 255, 0.8)';
  darkText = 'rgb(0,0,0)';
  lightText = 'rgb(255,255,255)';
  showTint = false; 
  tintColor = this.lightTint;
  textColor = this.darkText;

  checkTint(){
    this.showTint = this.tint == 'none' ? false : true;
    if(this.showTint){
        this.setTintColor();
        this.setTextColor();
    }
    
  }
  setTintColor(){
    this.tintColor = this.tint == 'light' ? this.lightTint  : this.darkTint;
  }
  setTextColor(){
    this.textColor = this.tint == 'light' ? this.darkText  : this.lightText;
  }

  ngOnInit(){
    this.checkTint();
  }

  ngOnChanges(){
    console.log('HELLO');
    this.checkTint();
  }

}