import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginFormComponent } from './login-form/login-form.component';

/**
 * Defines the primary application routes.
 */
const routes: Routes = [
  { path: 'profile', component: UserProfileComponent }, // Route for user profile view
  { path: 'login', component: LoginFormComponent },     // Route for user login view
];

/**
 * The main routing module for the application.
 * This module defines the app's routes and imports the RouterModule to handle them.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Imports the RouterModule and sets the app routes.
  exports: [RouterModule]                  // Exports RouterModule to make it available throughout the app.
})
export class AppRoutingModule { }
