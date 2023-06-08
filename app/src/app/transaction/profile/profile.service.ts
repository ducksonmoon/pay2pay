import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}

  transactions(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/transaction/profile/`);
  }
}
