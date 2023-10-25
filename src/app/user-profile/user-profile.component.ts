import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({});
  userData: any;
  editMode: boolean = false;
  userFavoriteMovies: any[] = [];

  constructor(
    private fb: FormBuilder,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  /** 
   * @name ngOnInit
   * @description Lifecycle hook that initializes the form and fetches user data and favorite movies.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.getUserData();
    this.getFavoriteMovies();
  }

  /** 
   * @name initializeForm
   * @description Initializes the user profile form.
   */
  private initializeForm(): void {
    this.profileForm = this.fb.group({
      Username: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Password: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Birthday: ['']
    });
  }

  /** 

   * @name saveUserData
   * @description Saves the user data if the form is valid.
   */
  saveUserData(): void {
    if (this.profileForm.valid) {
      this.fetchApiData.updateUser(this.profileForm.value).subscribe({
        next: (updatedUser) => {
          this.snackBar.open('Profile updated successfully!', 'OK', { duration: 2000 });
          localStorage.setItem('username', updatedUser.Username);
          this.editMode = false; // Exit edit mode after successful update
        },
        error: (error) => this.snackBar.open(error, 'OK', { duration: 2000 }),
      });
    } else {
      this.snackBar.open('Please ensure all form fields are valid!', 'OK', { duration: 2000 });
    }
  }

  /** 
   * @name getUserData
   * @description Fetches and sets user data from the API.
   */
  getUserData(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe(
        (userData) => {
          this.userData = userData;
          this.profileForm.patchValue(userData); // Populate the form with the fetched data
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.snackBar.open('Error fetching user data', 'OK', { duration: 2000 });
        }
      );
    }
  }

  /** 
   * @name getFavoriteMovies
   * @description Fetches and sets the list of favorite movies for the user.
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe(
      (favoriteMovieIds) => {
        // Assuming the response is an array of movie IDs
        this.userFavoriteMovies = favoriteMovieIds;
      },
      (error) => {
        console.error('Error fetching favorite movies:', error);
        this.snackBar.open('Error fetching favorite movies', 'OK', { duration: 2000 });
      }
    );
  }

  /** 
   * @name isFavorite
   * @description Checks if a movie is marked as favorite by the user.
   * @param movieId - The ID of the movie to check.
   * @returns {boolean} - True if the movie is a favorite, otherwise false.
   */
  isFavorite(movieId: string): boolean {
    return this.userFavoriteMovies.some(movie => movie._id === movieId);
  }

  /** 
   * @name removeFavorite
   * @description Removes a movie from the user's list of favorites.
   * @param movieId - The ID of the movie to be removed.
   */
  removeFavorite(movieId: string): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.removeFromFavorites(username, movieId).subscribe({
        next: (response) => {
          // Update local list of favorite movies
          this.userFavoriteMovies = this.userFavoriteMovies.filter(movie => movie._id !== movieId);
          this.snackBar.open('Movie removed from favorites!', 'OK', { duration: 2000 });
        },
        error: (error) => this.snackBar.open(error, 'OK', { duration: 2000 }),
      });
    } else {
      this.snackBar.open('Username not found!', 'OK', { duration: 2000 });
    }
  }

  /** 
   * @name enableEditMode
   * @description Enables the edit mode for the user profile form.
   */
  enableEditMode(): void {
    this.editMode = true;
  }

  /** 
   * @name goBack
   * @description Navigates the user to the previous page.
   */
  goBack(): void {
    this.location.back();
  }
}
