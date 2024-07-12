import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireBaseTokenData, TokenData } from '@models/login.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
import { MyValidators } from '@utils/validators';

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
    private router: Router,
    private tokenService: TokenService
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
        
            // this.sending = false;
            // const tokenData: TokenData = {
            //   user: (data as FireBaseTokenData).user,
            //   token: (data as FireBaseTokenData).user.accessToken,
            // } ;
            // this.tokenService.saveToken(tokenData);
            this.router.navigate(['/']);
         
      // else
      //   this.authService
      //     .signup(this.form.value)
          
      //       this.sending = false;
      //       this.router.navigate(['/login']);
         
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
