import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { SendService } from './send.service';
import { TriggerModel } from './send.model';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
  public walletAdress = 'TF1bYz1BE4n6zo2D4J2kDRK8MuqfbaCHgu';
  public transactionTrigerd = false;
  public waitForTransaction = false;
  public transactionCompleted = false;
  public spinnerTime = 0;
  public timeLeft = 900;
  public timer: NodeJS.Timer | undefined;
  public spinner: NodeJS.Timer | undefined;
  public error = '';

  get clock() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft - minutes * 60;
    const formatedSeconds = seconds === 0 ? '00' : seconds;

    return `${minutes} : ${formatedSeconds}`;
  }

  constructor(
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    private router: Router,
    private service: SendService
  ) {}

  ngOnInit(): void {}

  form = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    transactionID: new FormControl('', [Validators.required]),
  });

  startTransaction() {
    if (this.form.controls.transactionID.value) {
      this.error = '';
      this.service
        .send({
          amount: Number(this.form.controls.amount.value),
          txid: this.form.controls.transactionID.value as string,
          action: 2,
          receiver: this.walletAdress,
        })
        .subscribe((res: TriggerModel) => {
          localStorage.setItem(
            'currentTransaction',
            JSON.stringify({
              amount: this.form.controls.amount.value,
              id: this.form.controls.transactionID.value,
              completed: false,
              ref: res.ref,
            })
          );

          this.router.navigate(['/send/check']);
        });
    } else {
      this.error = 'Value Must be Entered';
    }
  }

  triggerTransaction() {
    if (this.form.controls.amount.value) {
      this.error = '';
      this.transactionTrigerd = true;
    } else {
      this.error = 'Value Must be Entered';
    }
  }

  copyWalletAdress() {
    this.clipboard.copy(this.walletAdress);
    this._snackBar.open('copied.', 'OK');
  }
}
