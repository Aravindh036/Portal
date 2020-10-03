import { Component, OnInit } from '@angular/core';
import sampleData from '../sample-data.json';
// const cloneDeep = require('lodash/clonedeep');
import mark from 'mark.js';
import { ActivatedRoute, Router } from '@angular/router';
import portalDetails from './all-portal-details.json';
import { collapseSidebar, getContainerElement } from '../controllers';

@Component({
  selector: 'app-basic-portal',
  templateUrl: './basic-portal.component.html',
  styleUrls: ['./basic-portal.component.css'],
})
export class BasicPortalComponent implements OnInit {
  sampleData: any;
  sampleDataOriginal: any;
  currentCard: HTMLDivElement;
  profileType: string;
  profileTypeUrl: string;
  markInstance: any;
  portalDetails: any;
  selectedCardJson: any;
  cardSelected = false;
  loading = true;
  portalType: any;
  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    this.sampleData = sampleData;
    this.sampleDataOriginal = sampleData;
    this.portalDetails = portalDetails;
    router.events.subscribe((data) => {
      this.cardSelected = false;
      // console.log(data);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 4000);
    });
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

  ngOnInit(): void {
    this.profileType = this.activeRouter.snapshot.params.type;
    this.profileTypeUrl = '/' + this.profileType;
    this.portalType = this.activeRouter.snapshot.params.portal_type;
    setTimeout(() => {
      this.loading = false;
    }, 4000);
    if (!(this.profileType in portalDetails) || !(this.portalType in portalDetails)) {
      this.router.navigate(['error']);
    }
  }
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
  toggleProfileOption = (event?: MouseEvent) => {
    const target = document.querySelector('.profile-options') as HTMLDivElement;
    const backdrop = document.querySelector(
      '.profile-option-backdrop'
    ) as HTMLDivElement;
    target.classList.toggle('show-select-option');
    backdrop.classList.toggle('hide');
  }
  updateSelectList = (event: Event) => {
    const target = event.target as HTMLInputElement;
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
    const target = getContainerElement(
      event.target as HTMLDivElement,
      'data-cards'
    );
    if (this.currentCard && this.currentCard !== target) {
      this.currentCard.classList.toggle('data-cards-selected');
      target.classList.toggle('data-cards-selected');
      const CardBG = this.currentCard.lastChild as HTMLDivElement;
      CardBG.classList.toggle('card-bg-selected');
      const CardContainerBG = this.currentCard.firstChild as HTMLDivElement;
      CardContainerBG.classList.toggle('card-container-bg-selected');
      const newCardBG = target.lastChild as HTMLDivElement;
      newCardBG.classList.toggle('card-bg-selected');
      const newCardContainerBG = target.firstChild as HTMLDivElement;
      newCardContainerBG.classList.toggle('card-container-bg-selected');
      this.currentCard = target;
      this.updateSelectedJson(target);
      if (this.cardSelected === false) {
        this.cardSelected = true;
      }
    }
    if (this.currentCard === undefined && this.currentCard !== target) {
      this.currentCard = target;
      this.currentCard.classList.toggle('data-cards-selected');
      const cardBG = target.lastChild as HTMLDivElement;
      cardBG.classList.toggle('card-bg-selected');
      const CardContainerBG = target.firstChild as HTMLDivElement;
      CardContainerBG.classList.toggle('card-container-bg-selected');
      this.updateSelectedJson(target);
      if (this.cardSelected === false) {
        this.cardSelected = true;
      }
    }
  }
  updateSelectedJson = (target: HTMLDivElement) => {
    let i: any;
    // tslint:disable-next-line: forin
    for (i of this.sampleData) {
      if (
        i.matnr === target.firstChild.childNodes[1].childNodes[0].textContent
      ) {
        this.selectedCardJson = i;
      }
    }
  }
  updateCardlist = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    this.sampleData = this.sampleDataOriginal.filter((data) => {
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
    this.markInstance = new mark(
      document.querySelector('.data-cards-container')
    );
    this.markInstance.mark(value, {
      element: 'span',
      className: 'highlight',
    });
  }
  collapseSidebar = () => {
    collapseSidebar();
  }
}
