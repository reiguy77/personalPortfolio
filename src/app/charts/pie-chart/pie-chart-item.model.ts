export class PieChartItem {
    label:string;
    color?:string;
    data:any;
  
    constructor(label:string, data:any, color?:string){
      this.label = label;
      this.color = color ? color : 'blue';
      this.data = data;
    }
  
  }
  