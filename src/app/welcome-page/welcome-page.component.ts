import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { fadeInAnimation } from '../animations';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  animations: [fadeInAnimation]
})
export class WelcomePageComponent implements OnInit {

  /** 
   * @name constructor
   * @description Initializes the WelcomePageComponent with required services and dependencies.
   * @param dialog - Service for opening modal/dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /** 
   * @name ngOnInit
   * @description Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
  }

  /** 
   * @name openUserRegistrationDialog
   * @description Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /** 
   * @name openUserLoginDialog
   * @description Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px'
    });
  }
}
