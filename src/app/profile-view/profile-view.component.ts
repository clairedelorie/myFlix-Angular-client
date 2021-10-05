import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

// material modules
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '500px',
    });
  }
}
