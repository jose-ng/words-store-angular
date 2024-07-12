import { AuthService } from '@/src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin = true;
  constructor(private router: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.router.url.subscribe((value) => {
      this.isLogin = value[0].path === 'login';
    });
  }
  submit() {
    console.log('submit');
    this.authService.login("shimozurdo@gmail.com", "@Sen1ores");
  } 
  logout(): void {
    this.authService.logout();
  }
}
