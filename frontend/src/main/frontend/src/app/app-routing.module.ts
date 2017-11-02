import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent }   from './login/login.component';
import { AccountsComponent }      from './accounts/accounts.component';
import { AccountDetailComponent }  from './account-detail/account-detail.component';
import { AddAccountComponent }  from './add-account/add-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: AccountDetailComponent },
  { path: 'accounts',     component: AccountsComponent },
  { path: 'add', component: AddAccountComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
