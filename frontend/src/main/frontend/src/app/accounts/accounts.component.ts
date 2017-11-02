import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [AccountService]
})
export class AccountsComponent implements OnInit {
  title = 'The Manager';
  accounts: Account[];
  selectedAccount: Account;
  row: number;

  constructor(private router: Router, private accountService: AccountService) { }

  getAccounts(): void {
    this.accountService.getAccounts().then(accounts => this.accounts = accounts);
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  onSelect(account: Account): void {
    this.selectedAccount = account;
    this.gotoDetail();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedAccount.id]);
  }

  add(account: Account): void {
    if (!account) { return; }
    this.accountService.create(account)
      .then(account => {
        this.accounts.push(account);
        this.selectedAccount = null;
      });
  }

  delete(account: Account): void {
      if (confirm("Delete " + account.company + "?") ){
        this.accountService
            .delete(account.id)
            .then(() => {
              this.accounts = this.accounts.filter(h => h !== account);
              if (this.selectedAccount === account) { this.selectedAccount = null; }
            });
      }
  }
}
