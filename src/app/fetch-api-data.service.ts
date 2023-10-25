import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/** API URL */
const apiUrl = 'https://hotpotatoes.onrender.com/';

/**
 * Service responsible for fetching data from the API.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Creates an instance of FetchApiDataService.
   * @param http HttpClient used for making API calls.
   */
  constructor(private http: HttpClient) {}

  /**
   * Registers a user.
   * @param userDetails User details for registration.
   * @returns Observable of any.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  /**
   * Logs in a user.
   * @param userDetails User details for login.
   * @returns Observable of any.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  /**
   * Fetches all movies.
   * @returns Observable of any.
   */
  public getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    /**
   * Fetches a single movie by its title.
   * @param title Movie title.
   * @returns Observable of any.
   */
    public getOneMovie(title: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/' + title, {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /**
   * Fetches a movie by its ID.
   * @param movieId Movie ID.
   * @returns Observable of any.
   */
  public getMovieById(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  

  /**
   * Fetches a director by name.
   * @param directorName Director's name.
   * @returns Observable of any.
   */
  public getOneDirector(directorName: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/director/' + directorName, {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /**
   * Fetches a genre by name.
   * @param genreName Genre name.
   * @returns Observable of any.
   */
   public getOneGenre(genreName: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/genre/' + genreName, {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get one user endpoint
  getOneUser(): Observable < any > {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'users/' + username, {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
 /**
   * Fetches a user's favorite movies.
   * @returns Observable of movie IDs.
   */
 public getFavoriteMovies(): Observable<string[]> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username + '/favoriteMovies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to a user's favorites.
   * @param username Username.
   * @param movieId Movie ID.
   * @returns Observable of any.
   */
  public addToFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

 /**
   * Removes a movie from a user's favorites.
   * @param username Username.
   * @param movieId Movie ID.
   * @returns Observable of any.
   */
 public removeFromFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


 /**
   * Updates user details.
   * @param updatedUser New user details.
   * @returns Observable of any.
   */
 public updateUser(updatedUser: any): Observable<any> {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.put(apiUrl + 'users/' + username, updatedUser, {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /**
   * Fetches user info by username.
   * @param username Username.
   * @returns Observable of any.
   */
   public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
    });
    return this.http.get(apiUrl + 'users/' + username, { headers: headers })
    .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a user.
   * @returns Observable of any.
   */
  public deleteUser(): Observable<any> {
    const username = localStorage.getItem('username'); // This line was missing
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
        })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
}



/**
   * Extracts data from API response.
   * @param res API response.
   * @returns Extracted data or an empty object.
   */
private extractResponseData(res: any): any {
  const body = res;
  return body || {};
}


/**
   * Handles errors during API calls.
   * @param error Error object or message.
   * @returns Observable throwing the error.
   */
private handleError(error: any): Observable<any> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}