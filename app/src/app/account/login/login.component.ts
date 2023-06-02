import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  serverSideErrorMessages: Array<string> = [];
  hide = true;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  getErrorMessage() {
    if (this.form.controls.email.hasError('email')) return 'Not a valid email';
    return this.form.errors;
  }

  async logUserIn() {
    const email = this.form.controls.email.value as string;
    const password = this.form.controls.password.value as string;
    this.accountService.getAuthToken(email, password).subscribe({
      error: (e) => {
        this.serverSideErrorMessages = Object.values(e.error);
        this.form.setErrors(this.serverSideErrorMessages);
      },
      complete: () =>
        this.router.navigate(['/profile']).then(() => {
          location.reload();
        }),
    });
  }
}
