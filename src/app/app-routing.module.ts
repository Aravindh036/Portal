import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasicPortalComponent } from './basic-portal/basic-portal.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login/:type', component: LoginComponent},
  {path: ':type/portal/:portal_type', component: BasicPortalComponent},
  {path: ':type/profile', component: ProfileComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
