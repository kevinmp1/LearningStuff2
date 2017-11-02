import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }        from './app.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountsComponent }     from './accounts/accounts.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { LoginComponent }  from './login/login.component';
import { AccountSearchComponent }  from './account-search/account-search.component';
import { AddAccountComponent }  from './add-account/add-account.component';

import { AccountService }         from './account.service';
import { AccountSearchService }   from './account-search.service';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountDetailComponent,
    DashboardComponent,
    AccountsComponent,
    AccountSearchComponent,
    AddAccountComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
