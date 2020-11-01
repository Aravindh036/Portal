import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDate } from 'src/app/basic-portal/helper';
import portalDetails from '../../basic-portal/all-portal-details.json'

@Component({
  selector: 'app-sale-order-template',
  templateUrl: './sale-order-template.component.html',
  styleUrls: ['./sale-order-template.component.css']
})
export class SaleOrderTemplateComponent implements OnInit {

  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  inquiry: string;
  sales: string;
  delivery: string;
  invoice: string;
  portalDetails = portalDetails;
  customerName: string;
  constructor(private activeRouter: ActivatedRoute) { }
  sub: any;
  ngOnInit(): void {
    this.getJson(this.cardJson, this.selectedCardJson);
    console.log(this.cardJson, this.selectedCardJson);
    this.activeRouter.queryParams.subscribe(params => {
      if(params['doc']){
        this.sales = params['doc'];
        this.inquiry = params['inquiry'];
        this.delivery = params['delivery'];
        this.invoice = params['invoice'];
      }
    });
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
