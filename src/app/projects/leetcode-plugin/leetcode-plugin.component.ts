import { Component, Input } from '@angular/core';
import { LeetCodeService } from './leetCodeService';
import { PieChartItem } from '../../charts/pie-chart/pie-chart-item.model';

@Component({
  selector: 'leetcode-plugin',
  templateUrl: './leetcode-plugin.component.html',
  styleUrls: ['./leetcode-plugin.component.less']
})
export class LeetcodePluginComponent {


  @Input() username: string = 'reiman_77';
  leetCodeUrl = 'https://leetcode.com/';
  leetCodeData:[] = [];
  chartData:PieChartItem[] = [];
  title:string = 'My LeetCode Stats';
  showSpinner:boolean = true;
  total:number = 0;

  constructor(private leetCodeService:LeetCodeService){
    
  }

  ngOnInit() {
    this.getData().then((data)=>{
      this.parseData(data);
      this.showSpinner = false;
    });
  }

  colorMap: {[key: string]: string;} = {
    'Easy': '#0cdcab',
    'Medium': '#ffbb1be4',
    'Hard': '#ce2626'
  }

  parseData(leetCodeData:[]){
    leetCodeData?.forEach((item:{difficulty:string, count:string, submissions:string})=> {
      if(item.difficulty == 'All'){
        this.total = (Number)(item.count);
      }
      else{
        this.chartData.push(new PieChartItem(item.difficulty, item.count, this.colorMap[item.difficulty]))
      }
    });

    this.chartData = [...this.chartData]
  }

  async getData(){
    const resp = await this.leetCodeService.getLeetCodeData(this.username);
    const leetCodeData = resp.data?.matchedUser?.submitStats.acSubmissionNum;
    return leetCodeData;
  }

}
