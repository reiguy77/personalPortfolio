import { Component, Input } from '@angular/core';

@Component({
  selector: 'quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.less']
})
export class QuoteComponent {
  @Input() quote:string = '';
  @Input() person:string = '';
}
