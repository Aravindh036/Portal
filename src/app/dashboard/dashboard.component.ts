import { Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import portalDetails from '../basic-portal/all-portal-details.json';
import { getContainerElement } from '../controllers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentSelected: HTMLElement;
  constructor(private router: Router) {}
  addBorder = (event: MouseEvent) => {
    const target = getContainerElement(event.target as HTMLDivElement, 'portal-card');
    if (target) {
      if (target.classList.length !== 0) {
        if (this.currentSelected !== undefined) {
          this.currentSelected.style.border = '2px solid #E0E0E0';
        }
        this.currentSelected = target;
        this.currentSelected.style.border = '2px solid #204173';
      }
    }
  }
  navigateToPortal = (event: MouseEvent) => {
    const target = getContainerElement(event.target as HTMLDivElement, 'portal-card');
    this.router.navigate([
      'login',
      target.getAttribute('card-data'),
    ])
  }
  ngOnInit(): void {}
}
