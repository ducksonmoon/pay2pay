import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public loggedIn = false;

  constructor(private accountService: AccountService, private router: Router) {
    this.loggedIn = this.accountService.isLoggedIn();
  }

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }
}
