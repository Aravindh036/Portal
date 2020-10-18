import { Component, Input, OnInit } from '@angular/core';
import { getDate } from 'src/app/basic-portal/helper';
import portalDetails from '../../basic-portal/all-portal-details.json'

@Component({
  selector: 'app-credit-memo-template',
  templateUrl: './credit-memo-template.component.html',
  styleUrls: ['./credit-memo-template.component.css']
})
export class CreditMemoTemplateComponent implements OnInit {
  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  portalDetails = portalDetails;
  constructor() { }

  ngOnInit(): void {
    this.getJson(this.cardJson, this.selectedCardJson);
    console.log(this.cardJson, this.selectedCardJson);
  }
  getJson=(cardJson: any, selectedCardJson:any)=>{
    for(let data of(cardJson)){
      if(data['VBELN']._text === selectedCardJson){
        this.cardJson = data;
      }
    }
  }
  getTime =(data: string) => {
    if(parseInt(data.slice(0,2)) >= 12)
      return `${parseInt(data.slice(0,2)) - 12} : ${data.slice(2,4)} PM`
    else
      return `${(data.slice(0,2))} : ${data.slice(2,4)} AM`
  }
  getUnitPrice = (price: string, unit: string) => {
    price = this.deleteDecimal(price);
    unit = this.deleteDecimal(unit);
    return (parseInt(price)/parseInt(unit));
  }
  deleteDecimal = (data) => {
    return data.split('.')[0];
  }
  getDate = getDate;
}
