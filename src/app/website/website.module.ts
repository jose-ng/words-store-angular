import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    ProfileComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, WebsiteRoutingModule, SharedModule, FormsModule]
})
export class WebsiteModule {}
