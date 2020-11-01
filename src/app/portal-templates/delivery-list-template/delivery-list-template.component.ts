import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDate } from 'src/app/basic-portal/helper';
import portalDetails from '../../basic-portal/all-portal-details.json'

@Component({
  selector: 'app-delivery-list-template',
  templateUrl: './delivery-list-template.component.html',
  styleUrls: ['./delivery-list-template.component.css']
})
export class DeliveryListTemplateComponent implements OnInit {
  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  portalDetails = portalDetails;
  customerName: string;
  inquiry: string;
  sales: string;
  invoice: string;
  delivery: string;
  constructor(private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getJson(this.cardJson, this.selectedCardJson);
    console.log(this.cardJson, this.selectedCardJson);
    this.customerName = localStorage.getItem('customerName');
    this.activeRouter.queryParams.subscribe(params => {
      if(params['doc']){
        this.inquiry = params['inquiry'];
        this.sales = params['sale'];
        this.invoice = params['invoice'];
        this.delivery = params['doc'];
      }
    });
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
