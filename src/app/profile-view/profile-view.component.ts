import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

import { FetchApiDataService } from '../fetch-api-data.service';

// material modules
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
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
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
    });
  }

  openUserUpdateDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '400px',
    });
  }
}
