import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  showNav = signal(false);

  collapseNavbar() {
    this.showNav.update((prev) => !prev);
  }
}
