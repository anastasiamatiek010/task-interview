import { Component, OnInit } from '@angular/core';
import { AllUserModel } from '../models/all-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  public allUser!: AllUserModel[];

  ngOnInit(): void {
    this.allUser = JSON.parse(localStorage.getItem('allUser') || '{}');
  }

}
