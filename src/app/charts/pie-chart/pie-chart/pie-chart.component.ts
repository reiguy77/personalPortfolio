import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import * as uuid from 'uuid';
// import { Color } from 'chart.js';


@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.less']
})
export class PieChartComponent {

  @Input() data:any;
  @Input() title:string = '';
  @Input() labels:string[] = [];
  @Input() colors:string[] = ['red', 'yellow', 'green']; 
  @Input() hoverOffset?: number;
  chartData: any;
  config = {
    type: 'doughnut',
    data: [],
  };
  chartId:string;
  pieChart?:any;

  constructor(){
    this.chartId = uuid.v4()+'_pie-chart';
    if(this.hoverOffset == undefined){
      this.hoverOffset = 4;
    }
    this.chartData = {
      
    };
  }

  generateGraph(){
    const canvas = <HTMLCanvasElement> document.getElementById(this.chartId);
    const ctx = canvas.getContext('2d');
    if(ctx){
      this.pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [{
            label: this.title,
            data: this.data,
            backgroundColor: this.colors,
            hoverOffset: this.hoverOffset
          }]
        },
        options: {
           responsive: false,
        },
     });
    }
  }
}
