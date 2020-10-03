import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-portal-details',
  templateUrl: './portal-details.component.html',
  styleUrls: ['./portal-details.component.css'],
})
export class PortalDetailsComponent implements OnInit {
  @Input() selectedCardJson;
  @Input() profileType;
  @Input() cardSelected;
  invoice = 'customer';
  constructor() {}

  ngOnInit(): void {
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
}
