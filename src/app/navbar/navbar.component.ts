import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }  // This is where you inject the Router service


  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/welcome']);  // Or wherever you want to redirect after logout.
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // assuming you're using a token for authentication
  }

}
