import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginComponent } from './shared/components/login/login.component';

@NgModule({ declarations: [AppComponent, NotFoundComponent, LoginComponent],
    bootstrap: [AppComponent], imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        SharedModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth())], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
