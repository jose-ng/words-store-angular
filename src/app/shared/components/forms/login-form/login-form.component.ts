import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  form!: FormGroup;
  emailExist = false;
  sending = false;
  ancorObj!: { text: string; link: string };
  isLogin = true;

  @Input() set InputisLogin(isLogin: boolean) {
    this.isLogin = isLogin;
    this.ancorObj = !isLogin
      ? { text: 'Already have an account?', link: 'login' }
      : { text: 'I forgot my password', link: 'home' };
    this.buildForm();
    if (!this.isLogin) {
      this.form.setValidators([MyValidators.matchPasswords]);
      this.form.get('confirmPassword')?.setValidators([Validators.required]);
      this.form.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private readonly router: Router
  ) {}

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
    });
  }

  save(e: MouseEvent) {
    e.preventDefault();
    if (this.form.valid) {
      this.emailExist = false;
      this.sending = true;
      if (this.isLogin)
        this.authService
          .login(this.form.value)
          .then(() => {
            this.sending = false;

            this.router.navigate(['/']);
          })
          .catch((e) => console.log(e.message));
      else
        this.authService
          .signup(this.form.value)
          .then(() => {
            this.sending = false;

            this.router.navigate(['/login']);
          })
          .catch((e) => {
            const { message } = e;
            if (message.includes('email-already-in-use'))
              this.emailExist = true;
            this.sending = false;
          });
    } else {
      this.form.markAllAsTouched();
    }
  }

  reset() {
    this.form.reset();
    if (!this.isLogin) {
      this.form.setValidators([MyValidators.matchPasswords]);
      this.form.get('confirmPassword')?.setValidators([Validators.required]);
      this.form.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
