import { Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentSelected: HTMLElement;
  constructor(private router: Router) {}
  addBorder = (event: MouseEvent) => {
    const target = this.getCardElement(event.target as HTMLElement, 'portal-card');
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
    const target = this.getCardElement(event.target as HTMLElement, 'portal-card');
    this.router.navigate([target.getAttribute('card-data'), 'portal']);
  }
  getCardElement = (target: HTMLElement, parentString: string) => {
    while (1) {
      if (target.classList.contains(parentString)) {
        return target;
      } else {
        target = target.parentElement as HTMLDivElement;
      }
    }
  }
  ngOnInit(): void {}
}
