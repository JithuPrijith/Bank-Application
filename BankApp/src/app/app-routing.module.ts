import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home-page', component: HomePageComponent
  },
  {
    path : 'signup', component : SignupComponent
  },
  {
    path : 'transaction', component : TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
