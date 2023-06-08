import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReciveService } from './recive.service';

@Component({
  selector: 'app-recive',
  templateUrl: './recive.component.html',
  styleUrls: ['./recive.component.css'],
})
export class ReciveComponent implements OnInit {
  public isSubmited = false;

  constructor(private service: ReciveService) {}

  ngOnInit(): void {}

  form = new FormGroup({
    address: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  submit() {
    this.service
      .trigger({
        receiver: this.form.controls.address.value || '',
        amount: Number(this.form.controls.amount.value) || 0,
        action: 1,
        txid: '1',
      })
      .subscribe({
        complete: () => (this.isSubmited = true),
      });
  }
}
