import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { getDate } from 'src/app/basic-portal/helper';
import portalDetails from '../../basic-portal/all-portal-details.json'

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.component.html',
  styleUrls: ['./invoice-template.component.css']
})
export class InvoiceTemplateComponent implements OnInit {

  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  portalDetails = portalDetails;
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
  getUnitPrice = (price: string, unit: string) => {
    price = this.deleteDecimal(price);
    unit = this.deleteDecimal(unit);
    return (parseInt(price)/parseInt(unit));
  }
  getDate = getDate;
}
