import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Account }           from './account';

@Injectable()
export class AccountSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Account[]> {
    return this.http
               .get(`http://localhost:5000/api/accounts?company=${term}`) //TODO: CHANGE THIS
               .map(response => response.json() as Account[]);
  }
}
