import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://hotpotatoes.onrender.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http : HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails : any): Observable < any > {
      console.log(userDetails);
      return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails : any): Observable < any > {
      console.log(userDetails);
      return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  // Making the api call for the get all movies endpoint
  getAllMovies(): Observable < any > {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get one movie endpoint
  getOneMovie(title : string): Observable < any > {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/' + title, {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  // Making the api call for the get a single movie endpoint
  getMovieById(movieId: string): Observable<any> {
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
  

  // Making the api call for the get one director endpoint
  getOneDirector(directorName : string): Observable < any > {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/director/' + directorName, {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token
              }
          )
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get one genre endpoint
  getOneGenre(genreName : string): Observable < any > {
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

// Making the api call to get favorite movies for a user endpoint
getFavoriteMovies(): Observable<string[]> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username + '/favoriteMovies', {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
      })
  }).pipe(
      tap(response => {
          console.log('Fetched Favorite Movies:', response);
      }),
      map(this.extractResponseData),
      catchError(this.handleError)
  );
}

  // Making the api call for the add a movie to favourite Movies endpoint
  addToFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // REMOVE FROM FAV
  removeFromFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }



  

  // Making the api call for the edit user endpoint
 updateUser(updatedUser : any): Observable < any > {
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

  //Get user info
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
    });
    return this.http.get(apiUrl + 'users/' + username, { headers: headers })
    .pipe(catchError(this.handleError));
  }

  // Making the api call for the delete user endpoint
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('username'); // This line was missing
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
        })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
}



  // Non-typed response extraction
  private extractResponseData(res : any): any {
      const body = res;
      return body || {};
  }


   // Handle error helper function
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