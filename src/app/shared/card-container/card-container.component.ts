import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CardContainerComponent {
    @Input() array: Array<any> = [];

}
