import { Component, Input, OnInit } from '@angular/core';
import { getDate } from 'src/app/basic-portal/helper';

@Component({
  selector: 'app-inquiry-template',
  templateUrl: './inquiry-template.component.html',
  styleUrls: ['./inquiry-template.component.css']
})
export class InquiryTemplateComponent implements OnInit {
  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  customerName: string;
  constructor() { }

  ngOnInit(): void {
    this.getJson(this.cardJson, this.selectedCardJson);
    console.log(this.cardJson, this.selectedCardJson);
    this.customerName = localStorage.getItem('customerName');

  }
  getJson=(cardJson: any, selectedCardJson:any)=>{
    for(let data of(cardJson)){
      if(data['VBELN']._text === selectedCardJson){
        this.cardJson = data;
      }
    }
  }
  deleteDecimal = (data) => {
    return data.split('.')[0];
  }
  getDate = getDate;
}
