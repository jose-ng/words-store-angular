// import {
//   Auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { LoginData } from '@models/login.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login({ email, password }: LoginData) {
    return of({ email, password });
  }

  signup({ email, password }: LoginData) {
    return of({ email, password });
  }

  logout() {
    return null
  }
}
