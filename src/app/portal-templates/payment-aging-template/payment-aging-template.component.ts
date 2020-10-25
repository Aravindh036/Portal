import { Component, Input, OnInit } from '@angular/core';
import { getDate } from 'src/app/basic-portal/helper';
import portalDetails from '../../basic-portal/all-portal-details.json'

@Component({
  selector: 'app-payment-aging-template',
  templateUrl: './payment-aging-template.component.html',
  styleUrls: ['./payment-aging-template.component.css']
})
export class PaymentAgingTemplateComponent implements OnInit {


  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  portalDetails = portalDetails;
  cardPayment={
    'S':"DEBIT",
    'H':"CREDIT"
  }
  constructor() { }

  ngOnInit(): void {
    this.getJson(this.cardJson, this.selectedCardJson);
    console.log(this.cardJson, this.selectedCardJson);
  }
  getJson=(cardJson: any, selectedCardJson:any)=>{
    for(let data of(cardJson)){
      if(data['BELNR']._text === selectedCardJson){
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
