import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public walletAdress = 'TF1bYz1BE4n6zo2D4J2kDRK8MuqfbaCHgu';
  public notFound = true;
  public transactionStarted = false;
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

  startTransactio() {
    this.transactionStarted = true;
    this.notFound = false;
    this.transactionTrigerd = false;
  }

  triggerTransactio() {
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
      this.timeLeft -= 1;
    }, 1000);

    setTimeout(() => {
      this.cancelTransfer();
      this.notFound = true;

      this.transactionStarted = false;
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
