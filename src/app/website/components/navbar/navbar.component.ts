import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private tokenService: TokenService) {}
  userIsLoggedIn = false;
  user?: User;
  isOpen = false;

  ngOnInit(): void {
    const tokenAuth = this.tokenService.getToken();
    this.user = tokenAuth?.user;
    this.userIsLoggedIn = tokenAuth?.user ? true : false;
  }

  logout(): void {
    this.tokenService.logout();
    window.location.pathname = '/';
  }
}
