import { Component, OnInit } from '@angular/core';
import mark from 'mark.js';
import { ActivatedRoute, Router } from '@angular/router';
import portalDetails from './all-portal-details.json';
import { collapseSidebar, getContainerElement } from '../controllers';
import { jsonDetailsType, routerType } from '../controllers/interface';

@Component({
  selector: 'app-basic-portal',
  templateUrl: './basic-portal.component.html',
  styleUrls: ['./basic-portal.component.css'],
})
export class BasicPortalComponent implements OnInit {
  jsonDetails: jsonDetailsType = {
    sampleData: [],
    sampleDataOriginal: [],
    portalDetails: portalDetails,
    selectedCardJson: null,
    additionalSearchKeys: null,
  };
  currentCard: HTMLDivElement;
  routerData: routerType = {
    profileType: null,
    profileTypeUrl: null,
    portalType: null,
  };
  sidebarShrink: boolean;
  markInstance: any;
  cardSelected = false;
  originalOptionList: any;
  optionList: any;
  loading = true;
  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    router.events.subscribe((data) => {
      this.cardSelected = false;
      this.loading = true;
      this.jsonDetails.portalDetails = portalDetails;
      this.originalOptionList = Object.values(this.jsonDetails.portalDetails[this.activeRouter.snapshot.params.portal_type].detailed_name);
      this.optionList = Object.values(this.jsonDetails.portalDetails[this.activeRouter.snapshot.params.portal_type].detailed_name);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({ userID:localStorage.getItem("user_id")});
      let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };
      fetch("http://localhost:8000/customer/inquiryData", requestOptions as unknown)
        .then(response => response.json())
        .then(result => {
          console.log("result",result);
          this.jsonDetails = {
            selectedCardJson: null,
            additionalSearchKeys: null,
            sampleDataOriginal: result.records,
            sampleData: result.records,
            portalDetails: portalDetails,
          };
          this.loading = false;
        })
        .catch(error => console.log('error', error));
    });
  }
  selectedOption: string;
  ngOnInit(): void {
    this.routerData = {
      profileType: this.activeRouter.snapshot.params.type,
      profileTypeUrl: '/' + this.activeRouter.snapshot.params.type,
      portalType: this.activeRouter.snapshot.params.portal_type,
    };
    if (
      !(this.routerData.profileType in portalDetails) ||
      !(this.routerData.portalType in portalDetails)
    ) {
      this.router.navigate(['error']);
    }
    if (localStorage.getItem('sidebar-status') !== undefined){
      this.sidebarShrink = localStorage.getItem('sidebar-status') === 'true' ? true : false;
      if(this.sidebarShrink){
        this.collapseSidebar();
      }
    }
    else{
      this.sidebarShrink = false;
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
    (document.querySelector('.search-option') as HTMLInputElement).focus();
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
      this.jsonDetails.selectedCardJson = target.getAttribute("card-id");
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
      this.jsonDetails.selectedCardJson = target.getAttribute("card-id");
      if (this.cardSelected === false) {
        this.cardSelected = true;
      }
    }
  }

  updateCardlist = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    const searchResult = [];
    if (target.value.length >= 3 && this.selectedOption !== undefined) {
      this.jsonDetails.sampleData = this.jsonDetails.sampleDataOriginal.filter(
        (data) => {
          // console.log(data, [this.selectedOption.toLowerCase()]);
          if (
            this.selectedOption &&
            data[this.selectedOption.toLowerCase()]
              .toString()
              .search(target.value)
          ) {
            return false;
          } else {
            if (!(this.jsonDetails.portalDetails[this.routerData.portalType]
                .primary_fields.includes(this.selectedOption.toLowerCase()))) {
                  searchResult.push(this.selectedOption.toLowerCase());
              }
              else{
                searchResult.push(undefined);
              }
            return true;
          }
        }
      );
      this.highlightResult(target.value);
      this.jsonDetails.additionalSearchKeys = searchResult;
    } else if (target.value.length >= 3) {
      this.jsonDetails.sampleData = this.jsonDetails.sampleDataOriginal.filter(
        (data) => {
          for (const [key, value] of Object.entries(data)) {
            if (!value.toString().search(target.value)) {
              if (!(this.jsonDetails.portalDetails[this.routerData.portalType]
                .primary_fields.includes(key))) {
                  searchResult.push(key);
              }
              else{
                searchResult.push(undefined);
              }
              return true;
            }
          }
          return false;
        }
      );
      this.jsonDetails.additionalSearchKeys = searchResult;
      this.highlightResult(target.value);
    } else {
      this.clearHighlight();
      this.jsonDetails.sampleData = this.jsonDetails.sampleDataOriginal;
      this.jsonDetails.additionalSearchKeys = [];
    }
  }
  highlightResult = (value: string) => {
    if (this.markInstance === undefined) {
      this.markInstance = new mark(
        document.querySelector('.data-cards-container')
      );
    }
    this.clearHighlight();
    this.markInstance.mark(value, {
      element: 'span',
      className: 'highlight',
    });
  }
  clearHighlight = () => {
    if (this.markInstance !== undefined) {
      this.markInstance.unmark();
    }
  }
  collapseSidebar = () => {
    collapseSidebar();
  }
  getDate = (data: string) =>{
    let date = new Date(parseInt(data.slice(0,3)), parseInt(data.slice(4,5)), parseInt(data.slice(6,7)))
    return date.toDateString();
  }
}
