import { AuthService } from '@/src/app/services/auth.service';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  showNav = signal(false);
  public isAuthorized$ = this.authService.isAuthorized$;
  constructor(private authService: AuthService) {}
  collapseNavbar() {
    this.showNav.update((prev) => !prev);
  }
}
