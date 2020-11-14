import { Component, Input, OnInit } from '@angular/core';
import { getDate } from 'src/app/basic-portal/helper';
import portalDetails from '../../basic-portal/all-portal-details.json'

@Component({
  selector: 'app-payment-overdue-template',
  templateUrl: './payment-overdue-template.component.html',
  styleUrls: ['./payment-overdue-template.component.css']
})
export class PaymentOverdueTemplateComponent implements OnInit {


  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  portalDetails = portalDetails;
  cardPayment={
    'S':"DEBIT",
    'H':"CREDIT"
  }
  customerID: string;
  constructor() { }

  ngOnInit(): void {
    this.getJson(this.cardJson, this.selectedCardJson);
    this.customerID = localStorage.getItem("user_id");
    console.log(this.cardJson, this.selectedCardJson);
  }
  getJson=(cardJson: any, selectedCardJson:any)=>{
    for(let data of(cardJson)){
      if(data['ADD1']._text === selectedCardJson){
        this.cardJson = data;
      }
    }
  }
  deleteDecimal = (data) => {
    return data.split('.')[0];
  }
  getUnitPrice = (price: string, unit: string) => {
    price = this.deleteDecimal(price);
    unit = this.deleteDecimal(unit);
    return (parseInt(price)/parseInt(unit));
  }
  getDate = getDate;

}
