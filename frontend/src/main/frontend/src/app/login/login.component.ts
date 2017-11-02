import { Component } from '@angular/core';

import { Managee } from '../managee';
import { AccountService } from '../account.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})

export class LoginComponent{
  managee: Managee;

  constructor( private accountService: AccountService){}

  login(){
    this.accountService.login(this.managee);
  }
}
