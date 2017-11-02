import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Account } from './account';
import { Managee } from './managee';

@Injectable()
export class AccountService {
  private accountsUrl = 'http://localhost:5000/api/account';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getAccounts(): Promise<Account[]> {
    return this.http.get(this.accountsUrl+"/all")
               .toPromise()
               .then(response => response.json() as Account[])
               .catch(this.handleError);
  }

  getAccount(id: number): Promise<Account> {
    const url = `${this.accountsUrl}/${id}`;
    return this.http.get(url)
              .toPromise()
              .then(response => response.json() as Account)
              .catch(this.handleError);
  }

  update(account: Account): Promise<Account> {
    const url = `${this.accountsUrl}/${account.id}`;
    return this.http
      .put(url, JSON.stringify(account), {headers: this.headers})
      .toPromise()
      .then(() => account)
      .catch(this.handleError);
  }

  create(account: Account): Promise<Account> {
    return this.http
      .post(this.accountsUrl, JSON.stringify({company: account.company,
            username: account.username, password: account.password}),
            {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Account)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.accountsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  login(managee: Managee): Promise<Managee>{
    return this.http
      .post('http://localhost:5000/login',JSON.stringify({username: managee.username,
          password: managee.password}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Managee)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
