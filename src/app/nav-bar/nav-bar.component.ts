import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// custom components
import { ProfileViewComponent } from '../profile-view/profile-view.component';

// material modules
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  userDetails: any;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  /**
   * opens modal with user details
   */
  openUserProfile(): void {
    this.dialog.open(ProfileViewComponent, {
      width: '500px',
    });
  }

  /**
   * navigates to "all movies"
   */
  openAllMovies(): void {
    this.router.navigate(['movies']);
  }

  public getUserDetails(): void {
    this.userDetails = localStorage.getItem('user');
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000,
    });
  }
}
