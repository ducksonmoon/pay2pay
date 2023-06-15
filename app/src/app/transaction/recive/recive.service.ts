import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ReciveService {
  constructor(private http: HttpClient) {}

  trigger(payload: {
    amount: number;
    txid: string;
    action: number;
    receiver: string;
  }) {
    return this.http.post<any[]>(
      `${environment.apiUrl}/transaction/trigger/`,
      payload
    );
  }

  info(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/auth/info/`);
  }
}
