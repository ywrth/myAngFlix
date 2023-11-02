/**
 * @fileoverview Movie Card Component for displaying movie details and actions.
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { forkJoin, Observable } from 'rxjs';

/**
 * @name MovieCardComponent
 * @description Component for rendering and managing movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  /** @docType property
   * @name movies
   * @description Array of movies fetched from the API.
   */
  movies: any[] = [];

  /** @docType property
   * @name likedMovies
   * @description Object mapping of movie IDs to boolean values indicating if they're liked.
   */
  likedMovies: { [key: string]: boolean } = {};

  /** @docType property
   * @name hoveredMovieId
   * @description The ID of the currently hovered movie, or null if none.
   */
  hoveredMovieId: string | null = null;

  /** @docType property
   * @name showModal
   * @description Boolean flag for whether the modal should be displayed.
   */
  showModal: boolean = false;

  /** @docType property
   * @name currentImageSrc
   * @description The source URL of the current image to be displayed in the modal.
   */
  currentImageSrc: string = '';
  
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  /** @docType method
   * @name ngOnInit
   * @description Lifecycle hook to fetch movie and favorites data on component initialization.
   */
  ngOnInit(): void {
    this.fetchMoviesAndFavorites();
  }
 
  /** @docType method
   * @name fetchMoviesAndFavorites
   * @description Fetch movies and favorite movies, and update the component state accordingly.
   */
  fetchMoviesAndFavorites(): void {
    forkJoin({
      allMovies: this.fetchApiData.getAllMovies(),
      favoriteMovies: this.fetchApiData.getFavoriteMovies()
    }).subscribe(({ allMovies, favoriteMovies }) => {
      this.movies = allMovies;
      this.updateLikedMoviesBasedOnFavorites(favoriteMovies);
    }, (error: any) => {
      console.error('Error fetching movies or favorites:', error);
      this.snackBar.open('Error fetching movies or favorites', 'OK', { duration: 2000 });
    });
  }

  /** @docType method
   * @name updateLikedMoviesBasedOnFavorites
   * @description Update the `likedMovies` object based on the provided favorite movie IDs.
   * @param favoriteMovieIds - An array of favorite movie IDs.
   */
  updateLikedMoviesBasedOnFavorites(favoriteMovieIds: string[]): void {
    for (const id of favoriteMovieIds) {
      this.likedMovies[id] = true;
    }
  }
  /** 
   * @name isFavorite
   * @description Determines if a movie is marked as favorite.
   * @param movieId - The ID of the movie to check.
   * @returns {boolean} - True if the movie is a favorite, otherwise false.
   */
  isFavorite(movieId: string): boolean {
    return this.likedMovies[movieId];
  }

  /** 
   * @name toggleFavorite
   * @description Toggles a movie's favorite status on or off.
   * @param movie - The movie object to be toggled.
   */
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.removeFromFavorites(movie._id);
    } else {
      this.addToFavorites(movie._id);
    }
  }

  /** 
   * @name openInfoDialog
   * @description Opens an information dialog with the provided title and content.
   * @param title - The title for the dialog.
   * @param content - The content/body for the dialog.
   */
  openInfoDialog(title: string, content: string): void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, content: content }
    });
  }

  /** 
   * @name addToFavorites
   * @description Adds a movie to the user's list of favorites.
   * @param movieId - The ID of the movie to be added.
   */
  addToFavorites(movieId: string): void {
    const username = localStorage.getItem('username');
    if (!username) return;
    this.fetchApiData.addToFavorites(username, movieId).subscribe({
      next: () => {
        this.likedMovies[movieId] = true;
        this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    });
  }

  /** 
   * @name removeFromFavorites
   * @description Removes a movie from the user's list of favorites.
   * @param movieId - The ID of the movie to be removed.
   */
  removeFromFavorites(movieId: string): void {
    const username = localStorage.getItem('username');
    if (!username) return;
    this.fetchApiData.removeFromFavorites(username, movieId).subscribe({
      next: () => {
        this.likedMovies[movieId] = false;
        this.snackBar.open('Removed from favorites!', 'OK', { duration: 2000 });
      },
      error: (error) => this.snackBar.open(error, 'OK', { duration: 2000 })
    });
  }

  /** 
   * @name openImageModal
   * @description Opens a modal displaying a larger version of the provided image.
   * @param imageUrl - The URL of the image to be displayed.
   */
  openImageModal(imageUrl: string): void {
    this.currentImageSrc = imageUrl;
    this.showModal = true;
  }

  /** 
   * @name closeImageModal
   * @description Closes the image modal.
   */
  closeImageModal(): void {
    this.showModal = false;
  }

  /** 
   * @name onLogout
   * @description Logs the user out by removing authentication tokens and navigating to the login page.
   */
  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  /** 
   * @name hoverIcon
   * @description Handles the hover state for movie icons.
   * @param movieId - The ID of the movie whose icon is being hovered.
   * @param isHovered - A boolean indicating if the icon is being hovered or not.
   */
  hoverIcon(movieId: string, isHovered: boolean): void {
    this.hoveredMovieId = isHovered ? movieId : null;
  }
}
