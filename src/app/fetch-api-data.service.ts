import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //User Login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Get one movie
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/id/:movieId', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Get Director
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Get Genre
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Get User
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Get favorite movies
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Add Favorite Movie
  addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${user}/Movies/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Edit user info
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Deletes user favorite movies
  removeFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}/Movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
