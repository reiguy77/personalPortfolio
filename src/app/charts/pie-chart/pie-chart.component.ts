import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import * as uuid from 'uuid';
import { PieChartItem } from './pie-chart-item.model';
import { ColorService } from 'src/app/services/color.service';
// import { Color } from 'chart.js';


@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class PieChartComponent implements OnChanges{
  @Input() data: PieChartItem[] = [];
  @Input() title:any;
  @Input() hoverOffset?: number;
  @Input() unit:string = '';
  chartData: any;
  chartId:string;
  pieChart?:any;
  options = {
    plugins: {
      title: {
        display: true,
        text: '',
        font: {
          size: 28,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
            label: (item:any) =>
                `${item.label}: ${item.formattedValue} ${this.unit}${item.formattedValue>1 ? 's' : ''}`,
        },
    },
    }
  }

  constructor(private colorService:ColorService){
    this.chartId = uuid.v4()+'_pie-chart';
    this.resetChartData();
  }

  resetChartData(){
    this.chartData = {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: [],
          hoverOffset: 4
        }]
      },
      options: this.options
    };
  }

  ngAfterViewInit(){
    this.displayPieChart();
  }


  generateGraph(){
    const canvas = <HTMLCanvasElement> document.getElementById(this.chartId);
    this.data.forEach((item:PieChartItem)=>{
      this.chartData.data.labels.push(item.label);
      if(item.color){
        this.chartData.data.datasets[0].backgroundColor.push(item.color);
        this.chartData.data.datasets[0].borderColor.push(this.colorService.shadeColor(item.color, -30));
      }
      this.chartData.data.datasets[0].data.push(item.data);
    })
    this.chartData.data.datasets[0].label = this.title;
    const ctx = canvas?.getContext('2d');
    if(ctx){
      this.options.plugins.title.text = this.title;
      this.chartData.options = this.options;
      this.pieChart = new Chart(ctx, {
        ...this.chartData,
      });
    }
  }

  displayPieChart(){
    this.resetChartData();
    this.generateGraph();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.displayPieChart();
    }
  }
}
