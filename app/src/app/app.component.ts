import { Component, HostListener } from '@angular/core';
import { AccountService } from 'src/_services/account.service';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  innerWidth: number;
  get isDesktop() {
    return this.innerWidth > 750;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(_event: any) {
  //   this.innerWidth = window.innerWidth;
  // }

  constructor(private accountService: AccountService) {
    this.innerWidth = window.innerWidth;
  }

  logout() {
    this.accountService.logout();
  }
}
