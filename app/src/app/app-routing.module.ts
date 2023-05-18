import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { SplashComponent } from './splash/splash.component';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './transaction/profile/profile.component';
import { TransactionItemsComponent } from './transaction/transaction-items/transaction-items.component';
import { SendComponent } from './transaction/send/send.component';
import { CheckComponent } from './transaction/check/check.component';
import { ReciveComponent } from './transaction/recive/recive.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'info', component: TransactionItemsComponent },
  { path: 'send', component: SendComponent },
  { path: 'recive', component: ReciveComponent },
  { path: 'send/check', component: CheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
