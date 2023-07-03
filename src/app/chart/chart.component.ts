import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, Color , ChartType, ChartData, ChartConfiguration, ChartEvent} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent {
  @Input() chartData: [{label:string, values:[]}] | [] = [];
  @Input() chartLabels: string[] = []; 
  @Input() chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
          type: 'time',
          time: {
              unit: 'month'
          }
      }
  }
  };
  @Input() chartType: string = 'line'; 
  @Input() onPointHover?: Function;
  @Output() pointHover: EventEmitter<String> = new EventEmitter<String>();


  lineChartData:ChartConfiguration['data'] | any = {};

  private newLabel? = 'New label';

  
  chartColors: Color[] = [
    'black',
  ];
  

  ngOnInit(): void {
    this.getChartData(this.chartData);
  }

  getChartData = (chartData:any) => {
    let labels:string[] = [];
    this.lineChartData = {
      datasets: [],
    };
    chartData.forEach((item:any)=>{
      const label:string = item.label;
      let dataset = {
        data: item.values,
        label: 'Time spent',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }

      //   data: [ 28, 48, 40, 19, 86, 27, 90 ],
        //   label: 'Series B',
        //   backgroundColor: 'rgba(77,83,96,0.2)',
        //   borderColor: 'rgba(77,83,96,1)',
        //   pointBackgroundColor: 'rgba(77,83,96,1)',
        //   pointBorderColor: '#fff',
        //   pointHoverBackgroundColor: '#fff',
        //   pointHoverBorderColor: 'rgba(77,83,96,1)',
        //   fill: 'origin',
        // },
      this.lineChartData['datasets'].push(dataset);
      
      // console.log('is it a this problem?', this.lineChartData);
      // this.lineChartData['labels'] = item.x_values;
    })
    // console.log('testing...', this.lineChartData, this.chartData);

    
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };



  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = ChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  public onChartHover(event: any): void {
    if (event.active.length > 0) {
        // Handle the hover event here
        this.pointHover.emit(event);
    }
  }



  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
    // console.log(this.chartData);
  }


  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x:any, i:any) => {
      const num = ChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }

  // ngOnChanges() {
  //   this.getChartData();
  //   } 
    ngOnChanges(changes: SimpleChanges) {
      
      this.getChartData(changes['chartData'].currentValue);
      this.chart?.update;
  }
}
