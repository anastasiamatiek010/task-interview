import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { OfficeComponent } from './office/office.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AppGuardService } from './app-guard.service';

export const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'office', component: OfficeComponent },
    { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AppGuardService] },
];
