import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

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

  get clock() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft - minutes * 60;
    const formatedSeconds = seconds === 0 ? '00' : seconds;

    return `${minutes} : ${formatedSeconds}`;
  }

  constructor(private clipboard: Clipboard, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  form = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    transactionID: new FormControl('', [Validators.required]),
  });

  startTransaction() {
    localStorage.setItem(
      'currentTransaction',
      JSON.stringify({
        amount: this.form.controls.amount.value,
        id: this.form.controls.transactionID.value,
        completed: false,
      })
    );
  }

  triggerTransaction() {
    this.transactionTrigerd = true;
  }

  copyWalletAdress() {
    this.clipboard.copy(this.walletAdress);
    this._snackBar.open('copied.', 'OK');
  }

  checkIfTransferCompleted() {
    this.waitForTransaction = true;

    this.spinner = setInterval(() => {
      if (true) {
        this.success();
      }
      this.spinnerTime += 1;
    }, 9000);

    this.timer = setInterval(() => {
      this.spinnerTime += 1;

      this.timeLeft -= 1;
    }, 1000);

    setTimeout(() => {
      this.cancelTransfer();

      this.transactionTrigerd = false;
      this.waitForTransaction = false;
    }, 900000);
  }

  cancelTransfer() {
    clearInterval(this.spinner);
    clearInterval(this.timer);

    this.spinnerTime = 0;
    this.timeLeft = 900;

    this.waitForTransaction = false;
  }

  private success() {
    this.cancelTransfer();
    this.transactionCompleted = true;
  }
}
