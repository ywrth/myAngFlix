import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  likedMovies: { [key: string]: boolean } = {};
  hoveredMovieId: string | null = null;
  showModal: boolean = false;
  currentImageSrc: string = '';
  
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchMoviesAndFavorites();
  }
 
  fetchMoviesAndFavorites(): void {
    forkJoin({
      allMovies: this.fetchApiData.getAllMovies(),
      favoriteMovies: this.fetchApiData.getFavoriteMovies()
    }).subscribe(({ allMovies, favoriteMovies }) => {
      this.movies = allMovies;
      this.updateLikedMoviesBasedOnFavorites(favoriteMovies);
    }, (error) => {
      console.error('Error fetching movies or favorites:', error);
      this.snackBar.open('Error fetching movies or favorites', 'OK', { duration: 2000 });
    });
  }

  updateLikedMoviesBasedOnFavorites(favoriteMovieIds: string[]): void {
    for (const id of favoriteMovieIds) {
      this.likedMovies[id] = true;
    }
  }

  isFavorite(movieId: string): boolean {
    return this.likedMovies[movieId];
  }

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

  openImageModal(imageUrl: string): void {
    this.currentImageSrc = imageUrl;
    this.showModal = true;
  }

  closeImageModal(): void {
    this.showModal = false;
  }

  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  hoverIcon(movieId: string, isHovered: boolean): void {
    this.hoveredMovieId = isHovered ? movieId : null;
  }
}
