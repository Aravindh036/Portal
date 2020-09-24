import { Component, OnInit } from '@angular/core';
import sampleData from '../sample-data.json';
// const cloneDeep = require('lodash/clonedeep');
import mark from 'mark.js';

@Component({
  selector: 'app-basic-portal',
  templateUrl: './basic-portal.component.html',
  styleUrls: ['./basic-portal.component.css'],
})
export class BasicPortalComponent implements OnInit {
  sampleData: any;
  sampleDataOriginal: any;
  currentCard: HTMLDivElement;
  markInstance: any;
  constructor() {
    this.sampleData = (sampleData);
    this.sampleDataOriginal = (sampleData);
    console.log(this.sampleData, mark);
  }
  selectedOption: string;
  originalOptionList = [
    'MANDT',
    'MATNR',
    'ERSDA',
    'ERNAM',
    'LAEDA',
    'AENAM',
    'VPSTA',
    'PSTAT',
    'LVORM',
    'MTART',
    'MBRSH',
    'MATKL',
    'BISMT',
    'MEINS',
    'BSTME',
    'ZEINR',
    'ZEIAR',
    'ZEIVR',
    'ZEIFO',
    'AESZN',
    'BLATT',
    'BLANZ',
  ];
  optionList = this.originalOptionList;

  ngOnInit(): void {}
  toggleSelect = (event?: MouseEvent) => {
    const target = document.querySelector(
      '.option-list-container'
    ) as HTMLDivElement;
    const backdrop = document.querySelector(
      '.filter-backdrop'
    ) as HTMLDivElement;
    target.classList.toggle('show-select-option');
    backdrop.classList.toggle('hide');
  }
  updateSelectList = (event: Event) => {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    this.optionList = this.originalOptionList.filter(
      (option) => option.toLowerCase().search(target.value.toLowerCase()) === 0
    );
  }
  updateSelectedOption = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    this.selectedOption = target.innerHTML.toUpperCase().trim();
    this.toggleSelect();
  }
  updateRecordDetails = (event: MouseEvent) => {
    const target = this.getCardElement(event.target as HTMLDivElement);
    if (this.currentCard && this.currentCard !== target) {
      this.currentCard.classList.toggle('data-cards-selected');
      target.classList.toggle('data-cards-selected');
      this.currentCard = target;
    }
    if (this.currentCard === undefined && this.currentCard !== target) {
      this.currentCard = target;
      this.currentCard.classList.toggle('data-cards-selected');
    }
  }
  getCardElement = (target: HTMLDivElement) => {
    while (1) {
      if (target.classList.contains('data-cards')) {
        return target;
      } else {
        target = target.parentElement as HTMLDivElement;
      }
    }
  }
  updateCardlist = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    this.sampleData = this.sampleDataOriginal.filter((data) => {
      console.log(
        data[this.selectedOption.toLowerCase()],
        this.selectedOption.toLowerCase()
      );
      if (
        this.selectedOption &&
        data[this.selectedOption.toLowerCase()].toString().search(target.value)
      ) {
        return false;
      } else {
        return true;
      }
    });
    this.highlightResult(target.value);
  }
  highlightResult = (value: string) => {
    const cardsArray = document.querySelector('.data-cards-container');
    console.log(cardsArray);
    this.markInstance = new mark(
      document.querySelector('.data-cards-container')
    );
    this.markInstance.mark(value, {
      element: 'span',
      className: 'highlight',
    });
    // cardsArray.
  }
  collapseSidebar = () => {
    const sidebar = document.querySelector('.basic-sidebar') as HTMLDivElement;
    const dashboardContent = document.querySelector('.dashboard-content') as HTMLDivElement;
    const toggleButtonState = document.querySelector(
      '.collapse img'
    ) as HTMLElement;
    const sidebarItems = (sidebar.querySelectorAll(
      '.sidebar-item'
    ) as unknown) as HTMLDivElement[];
    sidebar.classList.toggle('basic-sidebar-shrink');
    dashboardContent.classList.toggle('dashboard-content-unshrink');
    for (const item of sidebarItems) {
      item.classList.toggle('sidebar-item-shrink');
      if (toggleButtonState.getAttribute('rotated') === 'false') {
        // const img = document.createElement('img');
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
