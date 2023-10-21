import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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

  addToFavorites(movieId: string): void {
    const username = localStorage.getItem('username');
    if (!username) return;

    this.fetchApiData.addFavoriteMovie(username, movieId).subscribe({
      next: () => this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 }),
      error: (error) => this.snackBar.open(error, 'OK', { duration: 2000 }),
    });
  }

  hoverIcon(movieId: string, isHovered: boolean): void {  // Add this method here.
    this.hoveredMovieId = isHovered ? movieId : null;
  }

  toggleLike(movieId: string): void {  // Add this method here.
    if (this.likedMovies[movieId]) {
      this.likedMovies[movieId] = false;
    } else {
      this.likedMovies[movieId] = true;
    }
  }
}
