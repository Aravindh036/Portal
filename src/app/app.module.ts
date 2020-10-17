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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
