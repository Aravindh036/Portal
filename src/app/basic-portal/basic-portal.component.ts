import { Component, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
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
import EmployeePortalState from '../controllers/EmployeePortalState';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


// calendar types
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


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
  leaveRequest = {
    leave_type:null,
    leave_date: null,
    start_time: null,
    end_time: null,
    hours: null,
    reporting: null,
    reason: null,
  }
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
  sharedEmployeeStateInstance: EmployeePortalState;
  username: string;
  customerID: string;
  moduleDetails: string;

  // ********************** Leave Request dependencies

  @ViewChild('leaveRequestModal', { static: true })   leaveRequestModal: TemplateRef<any>;
  handleLeaveRequestModal(): void {
    this.modal.open(this.leaveRequestModal, { size: 'lg' });
  }

  // ********************************************

  // ********************** Calendar dependencies
  @ViewChild('modalContent', { static: true })   modalContent: TemplateRef<any>;
  activeDayIsOpen: boolean = true;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  refresh: Subject<any> = new Subject();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  events: CalendarEvent[] = [];

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  // *****************************

  constructor(private activeRouter: ActivatedRoute, private router: Router, private modal: NgbModal) {
    this.sharedCustomerStateInstance = CustomerPortalState.sharedStateInstance;
    this.sharedVendorStateInstance = VendorPortalState.sharedStateInstance;
    this.sharedEmployeeStateInstance = EmployeePortalState.sharedStateInstance;
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
        else if(this.routerData.profileType === "employee"){
          this.updateEmployeePortal();
        }
        console.log(this.routerData, this.originalOptionList, this.optionList )
      }
    });
  }

  async updateEmployeePortal(){
    this.barGraph = false;
    this.loading = true;
    this.moduleDetails = '';
    if(this.activeRouter.snapshot.params.portal_type === 'leave-data') {
      this.moduleDetails = 'employee-leave-data';
      this.barGraph = true;
      if(this.sharedEmployeeStateInstance.getLeaveData()){
          this.setPortalData(this.sharedEmployeeStateInstance.getLeaveData());
      }
      else{
        this.fetchLeaveData();
      }
    } 
    else if(this.activeRouter.snapshot.params.portal_type === 'leave-request') {
      this.barGraph = true;
      // this.loading = false;
      this.moduleDetails = 'employee-leave-request';
      this.fetchLeaveRequest();
    }
    else if(this.activeRouter.snapshot.params.portal_type === 'salary-data') {
      this.barGraph = true;
      this.moduleDetails = 'employee-salary-data';
      if(this.sharedEmployeeStateInstance.getSalaryData()){
          this.setPortalData(this.sharedEmployeeStateInstance.getSalaryData());
      }
      else{
        this.fetchSalaryData();
      }
    }
  }

  async updateVendorPortal(){
    this.barGraph = false;
    this.moduleDetails = '';
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
    else if(this.activeRouter.snapshot.params.portal_type === 'goods-receipt') {
      if(this.sharedVendorStateInstance.getPurchaseOrder()){
          this.setPortalData(this.sharedVendorStateInstance.getGoodsReceipt());
      }
      else{
        this.fetchGoodsReceipt();
      }
    }
    else if(this.activeRouter.snapshot.params.portal_type === 'invoice') {
      if(this.sharedVendorStateInstance.getPurchaseOrder()){
      //     this.setPortalData(this.sharedVendorStateInstance.getInvoice());
      // }
      // else{
      //   this.fetchInvoice();
      // }
        this.getInvoiceData("M");
      }
      else{
        this.fetchInvoiceCredit("M","0000000018");
      }
    }
    else if(this.activeRouter.snapshot.params.portal_type === 'payments-overdues') {
      if(this.sharedVendorStateInstance.getPurchaseOrder()){
          this.setPortalData(this.sharedVendorStateInstance.getPaymentOverdue());
      }
      else{
        this.fetchPaymentOverdue();
      }
    }
    else if(this.activeRouter.snapshot.params.portal_type === 'credit-memo') {
      if(this.sharedVendorStateInstance.getPurchaseOrder()){
          this.setPortalData(this.sharedVendorStateInstance.getCreditMemo());
      // }
      // else{
      //   this.fetchCreditmemo();
      // }
        this.getInvoiceData("O");
      }
      else{
        this.fetchInvoiceCredit("O","0000000018");
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
    this.moduleDetails = '';
    if(this.activeRouter.snapshot.params.portal_type === 'inquiry') {
    console.log("in customer portal update in if")
      if(this.sharedCustomerStateInstance.getInquiry()){
    console.log("in customer portal update in if if")
          this.setPortalData(this.sharedCustomerStateInstance.getInquiry());
          this.getInquiryData("A");
      }
      else{
    console.log("in customer portal update in if else")
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
          this.moduleDetails = 'bar-graph';
      }
      else{
        this.barGraph = true;
        this.moduleDetails = 'bar-graph';
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
    console.log(this.routerData.profileType, this.routerData.portalType, (this.routerData.profileType !== null || this.routerData.portalType !== null));
    if ((this.routerData.profileType !== null || this.routerData.portalType !== null) && (!(this.routerData.profileType in portalDetails) || !(this.routerData.portalType in portalDetails))) {
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
  //******************************************** */ CUSTOMER API FETCH REQUEST
  async fetchInvoiceCredit(type:string, userId?:string){
    let response:any = await fetch("http://localhost:8000/customer/invoiceDetails", this.buildHeader(userId) as unknown)
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
      this.moduleDetails = 'bar-graph';
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
  async fetchGoodsReceipt(){
    let response:any = await fetch("http://localhost:8000/vendor/goodsReceipt", this.buildHeader("0004000002") as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.sharedVendorStateInstance.setGoodsReceipt(this.jsonDetails.sampleDataOriginal);
    this.loading = false;
    console.log(result);
    // this.getQuotationPurchaseData(type);
  }
  async fetchInvoice(){
    let response:any = await fetch("http://localhost:8000/vendor/invoice", this.buildHeader("0004000002") as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.sharedVendorStateInstance.setInvoice(this.jsonDetails.sampleDataOriginal);
    this.loading = false;
    console.log(result);
  }
  async fetchPaymentOverdue(){
    let response:any = await fetch("http://localhost:8000/vendor/paymentOverdue", this.buildHeader("0004000002") as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.sharedVendorStateInstance.setInvoice(this.jsonDetails.sampleDataOriginal);
    this.loading = false;
    console.log(result);
  }
  async fetchCreditmemo(){
    let response:any = await fetch("http://localhost:8000/vendor/creditmemo", this.buildHeader("0004000002") as unknown)
    response = await response.json();
    let result = response.records;
    this.jsonDetails = {
      selectedCardJson: null,
      additionalSearchKeys: null,
      sampleDataOriginal: result,
      sampleData: result,
      portalDetails: portalDetails,
    };
    this.sharedVendorStateInstance.setCreditMemo(this.jsonDetails.sampleDataOriginal);
    this.loading = false;
    console.log(result);
  }
  //******************************************** */
    //********************************** employee API FETCH REQUEST*/

  buildGenericHeader = (type, data?) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw;
    if(type == "display"){
      raw = JSON.stringify({ user_id:localStorage.getItem("user_id"), portal: this.routerData.profileType, type: this.routerData.portalType });
    }
    else if(type == "update" && data == "leave-request"){
      raw = JSON.stringify({
        request_id: Math.floor(Math.random() * Math.floor(1000)),
        user_id: localStorage.getItem("user_id"),
        leave_type: this.leaveRequest.leave_type,
        leave_date: this.leaveRequest.leave_date,
        start_time: this.leaveRequest.start_time,
        end_time: this.leaveRequest.end_time,
        hours: this.leaveRequest.hours,
        reporting: this.leaveRequest.reporting,
        reason: this.leaveRequest.reason,
      });
    }
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return requestOptions;
  }
    //********************************** employee API FETCH REQUEST*/
    async fetchSalaryData(){
      let response:any = await fetch("http://localhost:8000/generic/dashboard", this.buildGenericHeader("display") as unknown)
      response = await response.json();
      let result = response.records == undefined ? []:response.records;
      this.jsonDetails = {
        selectedCardJson: null,
        additionalSearchKeys: null,
        sampleDataOriginal: result,
        sampleData: result,
        portalDetails: portalDetails,
      };
      this.sharedEmployeeStateInstance.setSalaryData(this.jsonDetails.sampleDataOriginal);
      this.loading = false;
      console.log(result);
    }
    async fetchLeaveRequest(){
      let response:any = await fetch("http://localhost:8000/generic/dashboard", this.buildGenericHeader("display") as unknown)
      response = await response.json();
      let result = response.records == undefined ? []:response.records;
      this.jsonDetails = {
        selectedCardJson: null,
        additionalSearchKeys: null,
        sampleDataOriginal: result,
        sampleData: result,
        portalDetails: portalDetails,
      };
      this.loading = false;
      console.log(result);
    }
    async fetchLeaveData(){
      let response:any = await fetch("http://localhost:8000/generic/dashboard", this.buildGenericHeader("display") as unknown)
      response = await response.json();
      let result = response.records == undefined ? []:response.records;
      this.jsonDetails = {
        selectedCardJson: null,
        additionalSearchKeys: null,
        sampleDataOriginal: result,
        sampleData: result,
        portalDetails: portalDetails,
      };
      this.sharedEmployeeStateInstance.setLeaveData(this.jsonDetails.sampleDataOriginal);
      console.log(new Date(getDate('20200603')));
      const leaveData: CalendarEvent[] = [];
      if(result){
        for(let i of result ){
          let leaveDataItem: CalendarEvent;
          leaveDataItem = {
            start: startOfDay(new Date(getDate('20201103'))),
            title: 'Check details',
            meta: i,
            color: colors.red,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true, 
          }
          leaveData.push(leaveDataItem);
        }
        this.events = leaveData;
      }
      this.loading = false;
      console.log(result);
    }

    async makeLeaveRequest(){
      let response:any = await fetch("http://localhost:8000/employee/leaveRequest", this.buildGenericHeader("update", "leave-request") as unknown)
      response = await response.json();
      let result = response.records;
      this.jsonDetails = {
        selectedCardJson: null,
        additionalSearchKeys: null,
        sampleDataOriginal: result,
        sampleData: result,
        portalDetails: portalDetails,
      };
      // this.sharedEmployeeStateInstance.set(this.jsonDetails.sampleDataOriginal);
      this.loading = false;
      console.log(result);
    }
    
  //**************************************** */

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
  async createLeaveRequest(){
    const leave_type = (document.querySelector('#select-absent-type') as HTMLInputElement).value;
    const leave_date = (document.querySelector('#input-date') as HTMLInputElement).value;;
    const start_time = (document.querySelector('#input-start-time') as HTMLInputElement).value;;
    const end_time = (document.querySelector('#input-end-time') as HTMLInputElement).value;;
    const hours = (document.querySelector('#input-absent-hours') as HTMLInputElement).value;;
    const reason = (document.querySelector('#textarea-leave-note') as HTMLTextAreaElement).value;
    if(leave_type && leave_date && start_time && end_time && hours && reason){
      this.loading = true;
      let button = document.querySelector('.create-request-button') as HTMLButtonElement;
      button.click();
      this.leaveRequest = {
        leave_type,
        leave_date,
        start_time: start_time,
        end_time: end_time,
        hours: hours,
        reporting: 'Rajesh',
        reason: reason,
      }
      let response:any = await fetch("http://localhost:8000/employee/leaveRequest", this.buildGenericHeader("update", "leave-request") as unknown)
      response = await response.json();
      let result = response;
      this.fetchLeaveRequest();
      console.log(result);
    }
  }
}
