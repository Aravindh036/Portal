import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasicPortalComponent } from './basic-portal/basic-portal.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { PortalDetailsComponent } from './portal-details/portal-details.component';
import { InvoiceTemplateComponent } from './portal-templates/invoice-template/invoice-template.component';
import { LoadingComponent } from './loading/loading.component';
import { EmployeeProfileComponent } from './profile-templates/employee-profile/employee-profile.component';
import { InquiryTemplateComponent } from './portal-templates/inquiry-template/inquiry-template.component';
import { SaleOrderTemplateComponent } from './portal-templates/sale-order-template/sale-order-template.component';
import { CreditMemoTemplateComponent } from './portal-templates/credit-memo-template/credit-memo-template.component';
import { DeliveryListTemplateComponent } from './portal-templates/delivery-list-template/delivery-list-template.component';
import {NgxPrintModule} from 'ngx-print';
import { ChartsModule } from 'ng2-charts';
import { OverallSalesTemplateComponent } from './graph/overall-sales-template/overall-sales-template.component';
import { ModalComponent } from './modal/modal.component';
import { PaymentAgingTemplateComponent } from './portal-templates/payment-aging-template/payment-aging-template.component';
import { GenericProfileComponent } from './profile-templates/generic-profile/generic-profile.component';
import { QuotationTemplateComponent } from './portal-templates/quotation-template/quotation-template.component';
import { PurchaseOrderTemplateComponent } from './portal-templates/purchase-order-template/purchase-order-template.component';
import { GoodsReceiptTemplateComponent } from './portal-templates/goods-receipt-template/goods-receipt-template.component';
import { PaymentOverdueTemplateComponent } from './portal-templates/payment-overdue-template/payment-overdue-template.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BasicPortalComponent,
    ProfileComponent,
    ErrorComponent,
    PortalDetailsComponent,
    InvoiceTemplateComponent,
    LoadingComponent,
    EmployeeProfileComponent,
    InquiryTemplateComponent,
    SaleOrderTemplateComponent,
    CreditMemoTemplateComponent,
    DeliveryListTemplateComponent,
    OverallSalesTemplateComponent,
    ModalComponent,
    PaymentAgingTemplateComponent,
    GenericProfileComponent,
    QuotationTemplateComponent,
    PurchaseOrderTemplateComponent,
    GoodsReceiptTemplateComponent,
    PaymentOverdueTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }