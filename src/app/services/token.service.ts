import { Injectable } from '@angular/core';
import { TokenData } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  saveToken(token: TokenData) {
    window.localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    const token = window.localStorage.getItem('token');
    return token? JSON.parse(token) : null;
  }

  logout() {
    window.localStorage.removeItem('token');
  }
}
