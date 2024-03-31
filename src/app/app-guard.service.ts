import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppGuardService implements CanActivate {

  constructor(private router: Router) { }

  public canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role == 'Admin') {
      return true;
    } else {
      this.router.navigateByUrl('');
      localStorage.clear();
      return false;
    }
  }
}
