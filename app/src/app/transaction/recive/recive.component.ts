import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recive',
  templateUrl: './recive.component.html',
  styleUrls: ['./recive.component.css'],
})
export class ReciveComponent implements OnInit {
  public isSubmited = false;

  constructor() {}

  ngOnInit(): void {}

  form = new FormGroup({
    address: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  submit() {
    this.isSubmited = true;
  }
}
