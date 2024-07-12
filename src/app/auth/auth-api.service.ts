import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthStateModel } from './auth-state.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  public login$(email: string, password: string) {
    return this.http.post<AuthStateModel>(`${environment.API_URL}/api/v1/auth/login`, {
      email,
      password,
    });
  }

  public register$(email: string, password: string) {
    return this.http.post<string>(`${environment.API_URL}/auth/register`, {
      email,
      password,
    });
  }
}
