import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CardComponent {
  filledStars: number[] = [];
  emptyStars: number[] = [];

  @Input() difficulty: number = 0;
  @Input() title: string = 'Title';
  @Input() description: string = 'Description';

  init(){
    this.getFilledStars();
    this.getEmptyStars();
  }
  getFilledStars() {
    this.filledStars = Array(this.difficulty).fill(0).map((x,i)=>i);
    
  }
  getEmptyStars() {
    this.emptyStars = Array(5-this.difficulty).fill(0).map((x,i)=>i);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getFilledStars();
    this.getEmptyStars();
  }

}
