import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {}

  public transactions: { from: string; amount: string; to: string }[] = [
    {
      from: 'TF1bYz1BE4n6zo2D4J2kDRK8MuqfbaCHgu',
      to: 'TF1bYz1BE4n6zo2D4J2kDRK8MuqfbaCHgu',
      amount: '15.28',
    },
    {
      from: 'TF1bYz1BE4n6zo2D4J2kDRK8MuqfbaCHgu',
      to: 'TF1bYz1BE4n6zo2D4J2kDRK8MuqfbaCHgu',
      amount: '15.28',
    },
  ];
}
