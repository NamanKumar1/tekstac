// code.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  private baseUrl = 'http://localhost:8080/api/code';

  constructor(private http: HttpClient) {}

  // Add a method for user authentication
  authenticateUser(request: any): Observable<any> {
    const url = `${this.baseUrl}/verifyUser/${request.userName}/${request.userPassword}`;
    return this.http.get(url);
  }
}
