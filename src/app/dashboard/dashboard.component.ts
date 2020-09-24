import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentSelected: HTMLElement;
  constructor() {}
  addBorder = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target) {
      if (target.classList.length !== 0) {
        if (this.currentSelected !== undefined) {
          this.currentSelected.style.border = '1px solid #E0E0E0';
        }
        this.currentSelected = target;
        this.currentSelected.style.border = '1px solid #204173';
      }
    }
  }
  ngOnInit(): void {}
}
