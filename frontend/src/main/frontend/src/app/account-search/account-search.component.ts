import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AccountSearchService } from '../account-search.service';
import { Account } from '../account';

@Component({
  selector: 'account-search',
  templateUrl: './account-search.component.html',
  styleUrls: [ './account-search.component.css' ],
  providers: [AccountSearchService]
})
export class AccountSearchComponent implements OnInit {
  accounts: Observable<Account[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private accountSearchService: AccountSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.accounts = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.accountSearchService.search(term)
        // or the observable of empty accounts if there was no search term
        : Observable.of<Account[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Account[]>([]);
      });
  }

  gotoDetail(account: Account): void {
    let link = ['/detail', account.id];
    this.router.navigate(link);
  }
}
