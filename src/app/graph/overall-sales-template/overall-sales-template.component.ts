import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overall-sales-template',
  templateUrl: './overall-sales-template.component.html',
  styleUrls: ['./overall-sales-template.component.css']
})
export class OverallSalesTemplateComponent implements OnInit {
  @Input() salesData;
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels:any;
  barChartType: string;
  barChartLegend = true;
  barChartData :any;
  constructor() { 
    
  }

  ngOnInit(): void {
    let label=[], data=[];
    for(let i of this.salesData){
      label.push(i.VBELN._text);
      if(i.WAERK._text == "INR"){
        data.push(parseInt(i.NETWR._text)/0.051);
      }
      else{
        data.push((i.NETWR._text));
      }
    }
    console.log(label, data)
    this.barChartLabels = label;
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = [
      {data: data, label: 'SALES ORDER WITH RESPECTIVE NET VALUE(SAR)'},
    ];
  }

}
