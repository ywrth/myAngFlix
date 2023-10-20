import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public loginData = { Username: '', Password: '' }; 

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
        next: (result) => {
            this.dialogRef.close();
            localStorage.setItem('token', result.token); // assuming the response contains the token in a field named 'token'
            localStorage.setItem('username', this.loginData.Username);
            this.snackBar.open('Login successful!', 'OK', { duration: 2000 });
        },
        error: (result) => {
            this.snackBar.open(result.error.message, 'OK', { duration: 2000 }); // assuming the error response has a message field
        }
    });
}
}
