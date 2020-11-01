import { Component, OnInit, SimpleChanges } from '@angular/core';
import mark from 'mark.js';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import portalDetails from './all-portal-details.json';
import { collapseSidebar, getContainerElement } from '../controllers';
import { jsonDetailsType, routerType } from '../controllers/interface';
// import json from './all-portal-details.json';
import { getDate, toggleProfileOption, toggleSelect } from './helper';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver'
import CustomerPortalState from '../controllers/CustomerPortalState';
import VendorPortalState from '../controllers/VendorPortalState';
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
  barGraph = false;
  sidebarShrink: boolean;
  markInstance: any;
  cardSelected = false;
  originalOptionList: any;
  optionList: any;
  loading = true;
  showBackdrop = false;
  sharedCustomerStateInstance: CustomerPortalState;
  sharedVendorStateInstance: VendorPortalState;
  username: string;
  customerID: string;
  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    this.sharedCustomerStateInstance = CustomerPortalState.sharedStateInstance;
    this.sharedVendorStateInstance = VendorPortalState.sharedStateInstance;
    router.events.subscribe((data) => {
      if (data instanceof NavigationEnd){
        this.cardSelected = false;
        this.jsonDetails.selectedCardJson = null;
        this.loading = true;
        this.originalOptionList = Object.values(this.jsonDetails.portalDetails[this.activeRouter.snapshot.params.portal_type].detailed_name);
        this.optionList = Object.values(this.jsonDetails.portalDetails[this.activeRouter.snapshot.params.portal_type].detailed_name);
        this.routerData = {
          profileType: this.activeRouter.snapshot.params.type,
          profileTypeUrl: '/' + this.activeRouter.snapshot.params.type,
          portalType: this.activeRouter.snapshot.params.portal_type,
        };
        if(this.routerData.profileType === "customer"){
          this.updateCustomerPortal();
        }
        else if(this.routerData.profileType === "vendor"){
          this.updateVendorPortal();
        }
        console.log("kk")
        console.log(this.routerData, this.originalOptionList, this.optionList )
      }
    });
  }
  async updateVendorPortal(){
    this.barGraph = false;
    if(this.activeRouter.snapshot.params.portal_type === 'quotation') {
      if(this.sharedVendorStateInstance.getQuotation()){
          this.setPortalData(this.sharedVendorStateInstance.getQuotation());
          this.getQuotationPurchaseData("A")
      }
      else{
        this.fetchQuotationPurchase("A");
      }
    } 
    else if(this.activeRouter.snapshot.params.portal_type === 'purchase-order') {
      if(this.sharedVendorStateInstance.getPurchaseOrder()){
          this.setPortalData(this.sharedVendorStateInstance.getPurchaseOrder());
          this.getQuotationPurchaseData("F")
      }
      else{
        this.fetchQuotationPurchase("F");
      }
    }
  }
  setPortalData=(data)=>{
    this.jsonDetails.sampleDataOriginal = data;
    this.jsonDetails.sampleData = data;
    setTimeout(()=>{this.loading = false}, 1000)
  }
  async updateCustomerPortal() {
    console.log("in customer portal update")
    this.barGraph = false;
    if(this.activeRouter.snapshot.params.portal_type === 'inquiry') {
      if(this.sharedCustomerStateInstance.getInquiry()){
          this.setPortalData(this.sharedCustomerStateInstance.getInquiry());
          this.getInquiryData("A");
      }
      else{
        this.fetchInquirySale("A");
      }
    }
    else if (this.activeRouter.snapshot.params.portal_type === 'delivery'){
      if(this.sharedCustomerStateInstance.getDelivery()){
          this.setPortalData(this.sharedCustomerStateInstance.getDelivery());
      }
      else{
        this.fetchDeliveryList();
      }
    }
    else if (this.activeRouter.snapshot.params.portal_type === 'payments-aging'){
      if(this.sharedCustomerStateInstance.getPaymentAging()){
          this.setPortalData(this.sharedCustomerStateInstance.getPaymentAging());
      }
      else{
        this.fetchPaymentAndAging();
      }
    }
    else if (this.activeRouter.snapshot.params.portal_type === 'sale-order'){5
      if(this.sharedCustomerStateInstance.getSalesData()){
          this.setPortalData(this.sharedCustomerStateInstance.getSalesData());
          this.getInquiryData("C");
      }
      else{
        this.fetchInquirySale("C");
      }
    }
    else if (this.activeRouter.snapshot.params.portal_type === 'invoice'){
      if(this.sharedCustomerStateInstance.getInvoice()){
          this.setPortalData(this.sharedCustomerStateInstance.getInvoice());
          this.getInvoiceData("M");
      }
      else{
        this.fetchInvoiceCredit("M");
      }
    }
    else if (this.activeRouter.snapshot.params.portal_type === 'credit-memo'){
      if(this.sharedCustomerStateInstance.getCreditMemo()){
          this.setPortalData(this.sharedCustomerStateInstance.getCreditMemo());
          this.getInvoiceData("O");
      }
      else{
        this.fetchInvoiceCredit("O");
      }
    }
    else if (this.activeRouter.snapshot.params.portal_type === 'orverall-sales'){
      if(this.sharedCustomerStateInstance.getOverallSales()){
          this.setPortalData(this.sharedCustomerStateInstance.getInquiry());
          this.getInquiryData("A");
          this.barGraph = true;
      }
      else{
        this.barGraph = true;
        await this.fetchInquirySale("C","G");
        await this.fetchInvoiceCredit("O");
      }
    }
  }
  saveGraph=()=>{
    domtoimage.toBlob(document.querySelector('.bar-graph'))
    .then(function(blob) {
      saveAs(blob, 'portal-container.png');
    });
  }
  deleteDecimal = (data) => {
    return data.split('.')[0];
  }

  //********************************** query function for customer */
  selectedOption: string;
  selectedOptionCode: string;
  getInquiryData = (docType: string) => {
    this.jsonDetails.sampleData = this.jsonDetails.sampleDataOriginal.filter((data) => {
      if(data.ZTERM._text === docType){
        return true;
      }
    });
    this.jsonDetails.sampleDataOriginal = this.jsonDetails.sampleData;
  }
  getInvoiceData = (docType: string) => {
    this.jsonDetails.sampleData = this.jsonDetails.sampleDataOriginal.filter((data) => {
      if(data.VTWEG._text === docType){
        return true;
      }
    });
    this.jsonDetails.sampleDataOriginal = this.jsonDetails.sampleData;
  }
  //**************************************** */
  //*******************************query function for vendor */
  getQuotationPurchaseData = (docType: string) => {
    this.jsonDetails.sampleData = this.jsonDetails.sampleDataOriginal.filter((data) => {
      if(data.BSTYP._text === docType){
        return true;
      }
    })
  }
  //****************************************
  updateModalShow=()=>{
    this.showBackdrop = true;
  }
  ngOnInit(): void {
    if (!(this.routerData.profileType in portalDetails) || !(this.routerData.portalType in portalDetails)) {
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
    this.username = localStorage.getItem('customerName');
    this.customerID = localStorage.getItem('user_id')
    console.log(this.username, this.customerID)
  }
  //******************************************** */ CUSTOMER API FETCH REQUEST
  buildHeader = (user_id?: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw;
    if(user_id){
      raw = JSON.stringify({ userID: user_id});
    }
    else{
      raw = JSON.stringify({ userID:localStorage.getItem("user_id")});
    }
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return requestOptions;
  }
  async fetchInvoiceCredit(type:string){
    let response:any = await fetch("http://localhost:8000/customer/invoiceDetails", this.buildHeader() as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.sharedCustomerStateInstance.setCreditMemo(this.jsonDetails.sampleDataOriginal);
    this.sharedCustomerStateInstance.setInvoice(this.jsonDetails.sampleDataOriginal);
    this.loading = false;
    this.getInvoiceData(type);
  }
  async fetchInquirySale(type: string, barGraph?:string){
    let response:any = await fetch("http://localhost:8000/customer/inquiryData", this.buildHeader() as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.loading = false;
    this.sharedCustomerStateInstance.setInquiry(this.jsonDetails.sampleDataOriginal);
    this.sharedCustomerStateInstance.setSalesData(this.jsonDetails.sampleDataOriginal);
    this.getInquiryData(type);
    if(barGraph){
      this.barGraph = true;
    }
  }
  async fetchDeliveryList(){
    let response:any = await fetch("http://localhost:8000/customer/deliveryList", this.buildHeader() as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.loading = false;
    this.sharedCustomerStateInstance.setDelivery(this.jsonDetails.sampleDataOriginal);
  }
  async fetchPaymentAndAging(){
    let response:any = await fetch("http://localhost:8000/customer/paymentAndAging", this.buildHeader() as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.loading = false;
    this.sharedCustomerStateInstance.setPaymentAging(this.jsonDetails.sampleDataOriginal);
  }
  //******************************************** */

  //********************************************* */ VENDOR API FETCH REQUEST
  async fetchQuotationPurchase(type:string){
    let response:any = await fetch("http://localhost:8000/vendor/quotationPurchase", this.buildHeader("0004000002") as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.sharedVendorStateInstance.setQuotation(this.jsonDetails.sampleDataOriginal);
    this.sharedVendorStateInstance.setPurchaseOrder(this.jsonDetails.sampleDataOriginal);
    this.loading = false;
    console.log(result);
    this.getQuotationPurchaseData(type);
  }
  //******************************************** */
  toggleSelect = toggleSelect;
  toggleProfileOption = toggleProfileOption;
  updateSelectList = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.optionList = this.originalOptionList.filter(
      (option) => option.toLowerCase().search(target.value.toLowerCase()) === 0
    );
  }
  updateSelectedOption = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    this.selectedOption = target.innerHTML.toUpperCase().trim();
    for(let [key, value] of Object.entries(this.jsonDetails.portalDetails[this.routerData.portalType].detailed_name)){
      if((value as string).trim() == target.innerHTML.trim()){
        this.selectedOptionCode = (key as string).toUpperCase();
      }
    }
    this.toggleSelect();
  }
  updateRecordDetails = (event: MouseEvent) => {
    // this.router.navigate([], {
    //   queryParams: {
    //     'doc': null,
    //     'inquiry': null,
    //     'invoice': null,
    //   },
    //   queryParamsHandling: 'merge'
    // })
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
    if (target.value.length >= 3 && this.selectedOptionCode !== undefined) {
      this.jsonDetails.sampleData = this.jsonDetails.sampleDataOriginal.filter(
        (data) => {
            if (
              this.selectedOptionCode &&
              data[this.selectedOptionCode]._text
                .toString()
                .search(target.value)
            ) {
              return false;
            } else {
              if (!(this.jsonDetails.portalDetails[this.routerData.portalType]
                  .primary_fields.includes(this.selectedOptionCode.toLowerCase()))) {
                    searchResult.push(this.selectedOptionCode.toLowerCase());
                }
                else{
                  searchResult.push(undefined);
                }
              return true;
            }
        }
      );
      this.highlightResult(target.value);
      // this.jsonDetails.additionalSearchKeys = searchResult;
    } else if (target.value.length >= 3) {
      this.jsonDetails.sampleData = this.jsonDetails.sampleDataOriginal.filter(
        (data) => {
          for (const [key, value] of Object.entries(data)) {
            console.log(key, value)
            if((value as any)._text){
              if (!(value as any)._text.toString().search(target.value)) {
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
          }
          return false;
        }
      );
      console.log(searchResult);
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
  getDate = getDate;
}
