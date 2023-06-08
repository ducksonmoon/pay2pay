import { Component, OnInit } from '@angular/core';
import { CheckService } from './check.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
})
export class CheckComponent implements OnInit {
  public currentTransaction: { amount: string; ref: string };
  public timer: NodeJS.Timer;
  public timeLeft = 900;
  public isDone = false;
  private requestTimer: NodeJS.Timer;

  get clock() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft - minutes * 60;
    const formatedSeconds = seconds === 0 ? '00' : seconds;

    return `${minutes} : ${formatedSeconds}`;
  }

  constructor(private service: CheckService) {}

  ngOnInit(): void {
    this.currentTransaction =
      JSON.parse(localStorage.getItem('currentTransaction')!) || [];
    this.checkIfTransferCompleted();
  }

  checkIfTransferCompleted() {
    this.timer = setInterval(() => {
      this.timeLeft -= 1;
    }, 1000);

    this.requestTimer = setInterval(() => {
      this.service
        .check({ ref: this.currentTransaction.ref })
        .subscribe((res) => {
          this.isDone = true;
          clearInterval(this.requestTimer);
          clearInterval(this.timer);
        });
    }, 5000);

    setTimeout(() => {
      clearInterval(this.timer);
      clearInterval(this.requestTimer);
    }, 900000);
  }
}
