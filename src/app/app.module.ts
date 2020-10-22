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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPrintModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
