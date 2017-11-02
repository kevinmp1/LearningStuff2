import { Component } from '@angular/core';

import { Account }    from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'account-form',
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent {
  model = new Account;
  constructor(private router: Router, private accountService: AccountService) { }

  onSubmit() {
    this.accountService.create(this.model).then(account => this.router.navigate(['/accounts']));
  }
}
