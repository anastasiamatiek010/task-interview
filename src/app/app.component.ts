import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { UserModel } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatInputModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
  ]
})
export class AppComponent implements OnInit {
  public title = 'task-interview';
  public user!: UserModel;

  ngOnInit(): void {
  }

  public login() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user.last_name) {
      return true
    } else {
      return false
    }
  }

  public admin() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user.role == 'Admin') {
      return true
    } else {
      return false
    }
  }
}
