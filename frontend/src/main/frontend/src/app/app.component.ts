import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <div>
      <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" routerLink="/dashboard" style="color: #369;">The Manager</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a routerLink="/accounts">Accounts</a></li>
          <li><a routerLink="/add">Add Account</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a routerLink="/logout">
            <span class="glyphicon glyphicon-log-out"></span>Logout</a>
          </li>
        </ul>
      </div>
      </nav>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
