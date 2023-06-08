import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { TriggerModel } from './send.model';

@Injectable({ providedIn: 'root' })
export class SendService {
  constructor(private http: HttpClient) {}

  send(payload: {
    amount: number;
    txid: string;
    action: number;
    receiver: string;
  }) {
    return this.http.post<TriggerModel>(
      `${environment.apiUrl}/transaction/trigger/`,
      payload
    );
  }
}
