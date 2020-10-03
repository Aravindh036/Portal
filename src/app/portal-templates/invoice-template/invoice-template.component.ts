import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.component.html',
  styleUrls: ['./invoice-template.component.css']
})
export class InvoiceTemplateComponent implements OnInit {

  @Input() invoiceData: any;
  @Input() profileType: any;
  @Input() cardSelected: any;
  constructor() { }
  ngOnInit(): void {
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
}
