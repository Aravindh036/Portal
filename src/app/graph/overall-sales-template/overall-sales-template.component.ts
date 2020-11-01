import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { toggleSelect } from 'src/app/basic-portal/helper';
import PortalState from 'src/app/controllers/CustomerPortalState';

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
  pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  yearOptionList:any[];
  selectedOption: string;
  graphType: string;
  barChartLabels:any;
  barChartType: string;
  barChartLegend = true;
  barChartData :any;
  pieChartLabels:any;
  pieChartType: string;
  pieChartLegend = true;
  pieChartData :any;
  bargraphCategory: string = 'sale';
  portalStateInstance: PortalState;
  constructor() { 
    this.graphType = 'bar';
    this.yearOptionList = [];
    this.portalStateInstance = PortalState.sharedStateInstance;
  }
  getInquiryData = (docType: string) => {
    this.salesData = this.salesData.filter((data) => {
      if(data.ZTERM._text === docType){
        return true;
      }
    })
  }
  getInvoiceData = (docType: string) => {
    this.salesData = this.salesData.filter((data) => {
      if(data.VTWEG._text === docType){
        return true;
      }
    })
  }
  updateBargraphCategory=(data)=>{
    if(this.bargraphCategory !== data){
      this.bargraphCategory = data;
      if(data === 'inquiry'){
        this.yearOptionList = [];
        this.salesData = this.portalStateInstance.getInquiry();
        this.getInquiryData("A");
        for(let i of this.salesData){
          const date = this.getDate(i.AUDAT._text);
          const year = date.getFullYear();
          if(!this.yearOptionList.includes(year)){
            this.yearOptionList.push(year);
          }
        }
        this.selectedOption = this.yearOptionList[0];
        this.updatePieChart(this.yearOptionList[0],"AUDAT");
        this.updateBargraph('inquiry');
      }
      else if(data === 'invoice'){
        this.yearOptionList = [];
        this.salesData = this.portalStateInstance.getInvoice();
        console.log(this.salesData)
        this.getInvoiceData("M");
        for(let i of this.salesData){
          const date = this.getDate(i.FKDAT._text);
          const year = date.getFullYear();
          if(!this.yearOptionList.includes(year)){
            this.yearOptionList.push(year);
          }
        }
        this.selectedOption = this.yearOptionList[0];
        this.updatePieChart(this.yearOptionList[0],"FKDAT");
        this.updateBargraph('invoice');
      }
      else if(data === 'sale'){
        this.yearOptionList = [];
        this.salesData = this.portalStateInstance.getSalesData();
        this.getInquiryData("C");
        for(let i of this.salesData){
          const date = this.getDate(i.AUDAT._text);
          const year = date.getFullYear();
          if(!this.yearOptionList.includes(year)){
            this.yearOptionList.push(year);
          }
        }
        this.selectedOption = this.yearOptionList[0];
        this.updatePieChart(this.yearOptionList[0],"AUDAT");
        this.updateBargraph('sale');
      }
    }
    console.log(this.salesData);
  }
  updatePieChart = (year, dateType) =>{
    let label=[], data=[];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let obj = {}
    for(let i of this.salesData){
      let date = this.getDate(i[dateType]._text);
      if(date.getFullYear() == year){
        if(!(monthNames[date.getMonth()] in obj)){
          obj[monthNames[date.getMonth()]] = {};
          obj[monthNames[date.getMonth()]].name = monthNames[date.getMonth()];
          obj[monthNames[date.getMonth()]].value = 1;
        }
        else{
          obj[monthNames[date.getMonth()]].value += 1;
        }
      }
    }
    let i = 0, key:string, value:any;
    for([key, value] of Object.entries(obj)){
      label[i] = key;
      data[i] = value.value;
      i++;
    }
    this.pieChartLabels = label;
    this.pieChartType = 'doughnut';
    this.pieChartLegend = true;
    this.pieChartData = [
      {data: data, label: 'SALES ORDER WITH RESPECTIVE NET VALUE(SAR)', backgroundColor:['#4982D7','#ff9f40','#FF6384','#FFCD56','#c9cbcf','#4ac0c0']},
    ];
  }
  toggleSelect = toggleSelect;
  updateGraph=(event, data)=>{
    if(this.graphType != data){
      this.graphType = data;
    }
  }
  updateSelectedOption = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    this.selectedOption = target.innerHTML.toUpperCase().trim();
    this.toggleSelect();
    this.updatePieChart(this.selectedOption,"AUDAT");
  }
  // ngOnChanges(changes: SimpleChanges){
  //   console.log(changes, this.graphType, this.graphType == 'pie');
  // }
  getDate(data){
    return new Date(parseInt(data.slice(0,4)), parseInt(data.slice(4,6)), parseInt(data.slice(6,8)));
  }
  ngOnInit(): void {
    this.salesData = this.portalStateInstance.getInquiry();
    this.updateBargraph('inquiry');
    for(let i of this.salesData){
      const date = this.getDate(i.AUDAT._text);
      const year = date.getFullYear();
      if(!this.yearOptionList.includes(year)){
        this.yearOptionList.push(year);
      }
    }
    this.updatePieChart(this.yearOptionList[0],"AUDAT");
  }
  updateBargraph=(type)=>{
    if(type === 'sale'){
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
      this.barChartLabels = label;
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.barChartData = [
        {data: data, label: 'SALES ORDER WITH RESPECTIVE NET VALUE(SAR)', backgroundColor:'#4982D7', defaultFontStyle:'bold'},
      ];
    }
    else if(type === 'inquiry'){
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
      this.barChartLabels = label;
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.barChartData = [
        {data: data, label: 'INQUIRY DATA WITH RESPECTIVE NET VALUE(SAR)', backgroundColor:'#4982D7', defaultFontStyle:'bold'},
      ];
    }
    else if(type === 'invoice'){
      let label=[], data=[];
      for(let i of this.salesData){
        label.push(i.VBELN._text);
        if(i.KUNAG._text == "INR"){
          data.push(parseInt(i.NETWR._text)/0.051);
        }
        else{
          data.push((i.NETWR._text));
        }
      }
      this.barChartLabels = label;
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.barChartData = [
        {data: data, label: 'INVOICE DATA WITH RESPECTIVE NET VALUE(SAR)', backgroundColor:'#4982D7', defaultFontStyle:'bold'},
      ];
    }
  }
}
