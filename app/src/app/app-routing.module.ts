import { Component, NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { SplashComponent } from './splash/splash.component';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './transaction/profile/profile.component';
import { SendComponent } from './transaction/send/send.component';
import { CheckComponent } from './transaction/check/check.component';
import { ReciveComponent } from './transaction/recive/recive.component';
import { BehaviorSubject } from 'rxjs';
import { PasscodeComponent } from './account/passcode/passcode.component';
import { InfoComponent } from './account/info/info.component';

const routes: Routes = [
  { path: '', component: getHomeComponent() },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passcode', component: PasscodeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'info', component: InfoComponent },
  { path: 'send', component: SendComponent },
  { path: 'recive', component: ReciveComponent },
  { path: 'send/check', component: CheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export function getHomeComponent(): Type<Component> {
  const userSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('user')!)
  );
  const isLoggedIn = userSubject.value && userSubject.value.token;
  if (isLoggedIn) {
    return <Type<Component>>ProfileComponent;
  } else {
    return <Type<Component>>SplashComponent;
  }
}
