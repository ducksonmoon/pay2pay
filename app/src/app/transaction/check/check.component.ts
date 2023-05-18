import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
})
export class CheckComponent implements OnInit {
  public currentTransaction: { amount: string } | undefined;
  public timer: NodeJS.Timer | undefined;
  public timeLeft = 900;

  get clock() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft - minutes * 60;
    const formatedSeconds = seconds === 0 ? '00' : seconds;

    return `${minutes} : ${formatedSeconds}`;
  }

  constructor() {}

  ngOnInit(): void {
    this.currentTransaction =
      JSON.parse(localStorage.getItem('currentTransaction')!) || [];
    this.checkIfTransferCompleted();
  }

  checkIfTransferCompleted() {
    this.timer = setInterval(() => {
      this.timeLeft -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(this.timer);
    }, 900000);
  }
}
