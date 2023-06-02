import { Component, HostListener } from '@angular/core';
import { AccountService } from 'src/_services/account.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  innerWidth: number;
  loggedIn = false;

  get isDesktop() {
    return this.innerWidth > 750;
  }

  constructor(private accountService: AccountService, private router: Router) {
    this.innerWidth = window.innerWidth;
    this.loggedIn = this.accountService.isLoggedIn();
  }
}
