// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

/**
 * AppComponent is the root component of the application.
 * It contains methods to open dialogs for user registration, login, and displaying movies.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  /**
   * Constructs the AppComponent and injects the MatDialog service for opening dialog boxes.
   * @param {MatDialog} dialog - The Angular Material Dialog service.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Opens the user registration dialog when the signup button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width.
      width: '280px'
    });
  }

  /**
   * Opens the login dialog.
   */
  openLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the dialog to display movies.
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}
