import { Component, Input, OnInit } from '@angular/core';
import { getDate } from 'src/app/basic-portal/helper';

@Component({
  selector: 'app-purchase-order-template',
  templateUrl: './purchase-order-template.component.html',
  styleUrls: ['./purchase-order-template.component.css']
})
export class PurchaseOrderTemplateComponent implements OnInit {
  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  customerName: string;
  customerID: string;
  constructor() { }

  ngOnInit(): void {
    this.getJson(this.cardJson, this.selectedCardJson);
    console.log(this.cardJson, this.selectedCardJson);
    this.customerName = localStorage.getItem('customerName');
    this.customerID = localStorage.getItem('user_id');

  }
  getJson=(cardJson: any, selectedCardJson:any)=>{
    for(let data of(cardJson)){
      if(data['EBELN']._text === selectedCardJson){
        this.cardJson = data;
      }
    }
  }
  deleteDecimal = (data) => {
    return data.split('.')[0];
  }
  getDate = getDate;

}
