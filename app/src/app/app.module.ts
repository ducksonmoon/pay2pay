import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './account/register/register.component';
import { SplashComponent } from './splash/splash.component';
import { LoginComponent } from './account/login/login.component';
import { JwtInterceptor } from 'src/_helpers/jwt-interceptor.service';
import { ProfileComponent } from './transaction/profile/profile.component';
import { SendComponent } from './transaction/send/send.component';
import { TransactionItemsComponent } from './transaction/transaction-items/transaction-items.component';
import { NavbarComponent } from './general/navbar/navbar.component';
import { CheckComponent } from './transaction/check/check.component';
import { ReciveComponent } from './transaction/recive/recive.component';
import { PasscodeComponent } from './account/passcode/passcode.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SplashComponent,
    LoginComponent,
    ProfileComponent,
    SendComponent,
    TransactionItemsComponent,
    NavbarComponent,
    CheckComponent,
    ReciveComponent,
    PasscodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
