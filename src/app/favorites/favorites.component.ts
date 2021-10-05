// core modules
import { Component, OnInit } from '@angular/core';

// custom components
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
// import MovieGenre / MovieDirector / MovieSynopsis

// material modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const user = localStorage.getItem('user');

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getMovies(): void {
    // this.isLoading: true
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      // this.isLoading: false
      this.movies = resp;
      console.log(this.movies);
      return this.filterFavorites();
    });
  }

  getUsersFavs(): void {
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favs = resp.favoritemovies;
      console.log(this.favs, 'favs');
      return this.favs;
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favs.includes(movie._id)) {
        this.favorites.push(movie);
      }
      console.log(this.favorites, 'favorites');
    });
    return this.favorites;
  }

  addToUserFavorites(id: string, title: string): void {
    this.fetchApiData.addFavorite(id).subscribe((res: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      });
      return this.getUsersFavs();
    });
  }

  removeFromUserFavorites(id: string, title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
      this.snackBar.open(
        `${title} has been removed from your favorites.`,
        'OK',
        {
          duration: 3000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    });
    return this.getUsersFavs();
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  openDirector(name: string, bio: string, birth: number, death: number): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birth, death },
      width: '500px',
    });
  }
  openSynopsis(title: string, imageUrl: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, imageUrl, description },
      width: '500px',
    });
  }

  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
