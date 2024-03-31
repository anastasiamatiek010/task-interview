import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../service/requests.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog'
import { DescriptionComponent } from '../description/description.component';
import { UserModel } from '../models/user';
import { ReportModel } from '../models/report';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AllUserModel } from '../models/all-user';

@Component({
  selector: 'app-office',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
  ],
  templateUrl: './office.component.html',
  styleUrl: './office.component.scss'
})
export class OfficeComponent implements OnInit {
  public user!: UserModel;
  public report!: ReportModel[];
  public allUser!: AllUserModel[];

  constructor(
    private requestsService: RequestsService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.report = JSON.parse(localStorage.getItem('report') || '{}');
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    let token = user.token;

    this.requestsService.getUserAssessments(token).subscribe((report) => {
      this.report = report;
      let reportValue = JSON.stringify(report);
      localStorage.setItem('report', reportValue);
    });
    this.userAll()
  }

  public getUserAssessmentGraph(i: number, id: number) {
    id = this.report[i].id
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    let token = user.token;

    this.requestsService.getUserAssessmentGraph(id, token).subscribe((details) => {
      const dialogRef = this.dialog.open(DescriptionComponent, {
        width: '550px',
        data: details
      })
    })
  }

  public userAll() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user.role == 'Admin') {
      this.requestsService.getUsers().subscribe((value) => {
        let allUser = JSON.stringify(value);
        localStorage.setItem('allUser', allUser);
      })
    }
  }

  public exit() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
