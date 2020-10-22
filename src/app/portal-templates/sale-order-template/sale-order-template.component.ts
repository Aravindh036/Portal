import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDate } from 'src/app/basic-portal/helper';

@Component({
  selector: 'app-sale-order-template',
  templateUrl: './sale-order-template.component.html',
  styleUrls: ['./sale-order-template.component.css']
})
export class SaleOrderTemplateComponent implements OnInit {

  @Input() selectedCardJson: any;
  @Input() cardJson: any;
  constructor(private activeRouter: ActivatedRoute) { }
  sub: any;
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
  deleteDecimal = (data) => {
    return data.split('.')[0];
  }
  getDate = getDate;
}
