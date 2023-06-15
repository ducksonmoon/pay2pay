import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReciveService } from './recive.service';

export enum Verification {
  noRequest = 1,
  pending = 2,
  verified = 3,
}

@Component({
  selector: 'app-recive',
  templateUrl: './recive.component.html',
  styleUrls: ['./recive.component.css'],
})
export class ReciveComponent implements OnInit {
  public isSubmited = false;
  public message = '';
  get errorMessage() {
    return this.message;
  }

  constructor(private service: ReciveService) {}

  ngOnInit(): void {
    this.message = '';
  }

  form = new FormGroup({
    address: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  checkBeforeSubmit(): boolean {
    let verified = false;
    this.service.info().subscribe((res) => {
      if (res.verified !== Verification.verified) {
        verified = false;
      }

      verified = true;
    });

    return verified;
  }

  submit() {
    if (!this.checkBeforeSubmit()) {
      this.message = 'Verify Your Account';
    }

    this.service
      .trigger({
        receiver: this.form.controls.address.value as string,
        amount: Number(this.form.controls.amount.value),
        action: 1,
        txid: '1',
      })
      .subscribe({
        complete: () => (this.isSubmited = true),
      });
  }
}
