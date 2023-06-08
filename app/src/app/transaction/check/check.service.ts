import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CheckService {
  constructor(private http: HttpClient) {}

  check(payload: { ref: string }): Observable<any[]> {
    return this.http.post<any[]>(
      `${environment.apiUrl}/transaction/check/`,
      payload
    );
  }
}
