import { Component, Input, OnInit } from '@angular/core';
import { getDate } from 'src/app/basic-portal/helper';
import portalDetails from '../../basic-portal/all-portal-details.json'
@Component({
  selector: 'app-leave-request-template',
  templateUrl: './leave-request-template.component.html',
  styleUrls: ['./leave-request-template.component.css']
})
export class LeaveRequestTemplateComponent implements OnInit {

 
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
      if(data['FIELD1']._text === selectedCardJson){
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
