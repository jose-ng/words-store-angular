import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    console.log(password, confirmPassword);
    return password === confirmPassword ? null : { 'password_mismatch': true };
  }
}
