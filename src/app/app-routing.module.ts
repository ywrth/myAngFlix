import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
{ path: 'profile', component: UserProfileComponent }, // Add this route
{ path: 'login', component: LoginFormComponent }, // Add this route'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
