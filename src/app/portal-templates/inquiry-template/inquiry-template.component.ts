import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inquiry-template',
  templateUrl: './inquiry-template.component.html',
  styleUrls: ['./inquiry-template.component.css']
})
export class InquiryTemplateComponent implements OnInit {
  @Input() invoiceData: any;
  @Input() profileType: any;
  @Input() cardSelected: any;
  constructor() { }

  ngOnInit(): void {
  }

}
