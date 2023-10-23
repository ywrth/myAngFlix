import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  likedMovies: { [key: string]: boolean } = {};
  hoveredMovieId: string | null = null;

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Check if a movie is liked
  isFavorite(movieId: string): boolean {
    return this.likedMovies[movieId];
  }

  // Toggle the favorite status of a movie
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.removeFromFavorites(movie._id);
    } else {
      this.addToFavorites(movie._id);
    }
  }

  openInfoDialog(title: string, content: string): void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, content: content }
    });
  }

  addToFavorites(movieId: string): void {
    const username = localStorage.getItem('username');
    if (!username) return;
  
    console.log(`Attempting to add movie with ID ${movieId} to favorites for user ${username}`);  // Log the attempt
  
    this.fetchApiData.addToFavorites(username, movieId).subscribe({
      next: () => {
        this.likedMovies[movieId] = true;
        this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
        console.log(`Successfully added movie with ID ${movieId} to favorites.`);  // Log the success
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
        console.error(`Error adding movie with ID ${movieId} to favorites. Error:`, error);  // Log the error
      },
    });
  }
  

  // Remove a movie from favorites
  removeFromFavorites(movieId: string): void {
    const username = localStorage.getItem('username');
    if (!username) return;

    this.fetchApiData.removeFromFavorites(username, movieId).subscribe({
      next: () => {
        this.likedMovies[movieId] = false;
        this.snackBar.open('Removed from favorites!', 'OK', { duration: 2000 });
      },
      error: (error) => this.snackBar.open(error, 'OK', { duration: 2000 }),
    });
  }

  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);  // Redirect to the login page.
  }

  hoverIcon(movieId: string, isHovered: boolean): void {
    this.hoveredMovieId = isHovered ? movieId : null;
  }

  toggleLike(movieId: string): void {
    if (this.likedMovies[movieId]) {
      this.likedMovies[movieId] = false;
    } else {
      this.likedMovies[movieId] = true;
    }
  }
}
