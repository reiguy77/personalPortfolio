import { Component } from '@angular/core';
import { LeetCodeService } from './leetCodeService';
import { PieChartItem } from '../../charts/pie-chart/pie-chart-item.model';

@Component({
  selector: 'leetcode-plugin',
  templateUrl: './leetcode-plugin.component.html',
  styleUrls: ['./leetcode-plugin.component.less']
})
export class LeetcodePluginComponent {


  username: string = 'reillym';
  leetCodeData:[] = [];
  chartData:PieChartItem[] = [];
  title:string = 'My LeetCode Stats';
  showSpinner:boolean = true;

  constructor(private leetCodeService:LeetCodeService){
    
  }

  ngOnInit() {
    this.getData().then((data)=>{
      this.parseData(data);
      this.showSpinner = false;
    });
  }

  colorMap: {[key: string]: string;} = {
    'Easy': '#26bf5c',
    'Medium': '#ffec45',
    'Hard': '#ff5445'
  }

  parseData(leetCodeData:[]){
    leetCodeData?.forEach((item:{difficulty:string, count:string, submissions:string})=> {
      if(item.difficulty == 'All'){
        return;
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
