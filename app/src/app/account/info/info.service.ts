import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InfoService {
  constructor(private http: HttpClient) {}

  info(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/auth/info/`);
  }

  upload(file: File): Observable<any[]> {
    let formData = new FormData();
    formData.append('picture', file);

    return this.http.post<any[]>(
      `${environment.apiUrl}/auth/assessment/`,
      formData
    );
  }
}
