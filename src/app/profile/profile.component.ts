import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  collapseSidebar = () => {
    const sidebar = document.querySelector('.basic-sidebar') as HTMLDivElement;
    const toggleButtonState = document.querySelector(
      '.collapse img'
    ) as HTMLElement;
    const sidebarItems = (sidebar.querySelectorAll(
      '.sidebar-item'
    ) as unknown) as HTMLDivElement[];
    sidebar.classList.toggle('basic-sidebar-shrink');
    for (const item of sidebarItems) {
      item.classList.toggle('sidebar-item-shrink');
      if (toggleButtonState.getAttribute('rotated') === 'false') {
        const img = document.createElement('img');
        // img.src = `assets/${item.getAttribute('short-form')}.svg`;
        // item.innerHTML = '';
        // item.appendChild(img);
        item.innerHTML = item.getAttribute('short-form');
      } else {
        console.log('hehe', item, item.getAttribute('full-form'));
        item.innerHTML = item.getAttribute('full-form');
      }
    }
    toggleButtonState.getAttribute('rotated') === 'true'
      ? toggleButtonState.setAttribute('rotated', 'false')
      : toggleButtonState.setAttribute('rotated', 'true');
  }
}
