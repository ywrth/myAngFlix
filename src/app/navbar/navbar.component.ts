import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
/**
 * Component representing a navigation bar.
 */
export class NavbarComponent {
  /**
   * Constructs the navigation bar component.
   * @param router Router service.
   */
  constructor(private router: Router) { }

  /**
   * Method to handle user logout.
   */
  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/welcome']);  // Or wherever you want to redirect after logout.
  }
/**
   * Check if the user is logged in.
   * @returns True if logged in, otherwise false.
   */
get isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // assuming you're using a token for authentication
  }

}
