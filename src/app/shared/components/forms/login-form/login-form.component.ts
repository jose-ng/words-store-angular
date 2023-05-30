import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  form!: FormGroup;
  submitted = false;
  sending = false;
  ancorObj!: { text: string, link: string };
  _isLogin = true;

  @Input() set isLogin(isLogin: boolean) {
    this._isLogin = isLogin;
    this.ancorObj = !isLogin
      ? { text: 'Already have an account?', link: 'login' }
      : { text: 'I forgot my password', link: 'home' };
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private readonly router: Router
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
    });
  }

  save(e: MouseEvent) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.valid) {
      this.sending = true;

      this.authService
        .login(this.form.value)
        .then(() => {
          this.sending = false;
          this.submitted = false;
          this.router.navigate(['/']);
        })
        .catch((e) => console.log(e.message));
    } else {
      this.form.markAllAsTouched();
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
