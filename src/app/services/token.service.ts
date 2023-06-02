import { Injectable } from '@angular/core';
import { TokenData } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isClient: boolean;

  constructor() {
    this.isClient = typeof window !== 'undefined';
  }

  saveToken(token: TokenData) {
    this.isClient &&
      window.localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    const token = this.isClient ? window.localStorage.getItem('token') : null;
    return token ? JSON.parse(token) : null;
  }

  logout() {
    window.localStorage.removeItem('token');
  }
}
