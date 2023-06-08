import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private service: ProfileService) {}

  public transactions: {
    amount: string;
    receiver: string;
    state: number;
    formatted_date: string;
  }[] = [];

  ngOnInit(): void {
    this.service.transactions().subscribe((res) => {
      this.transactions.push(...res);
    });
  }
}
