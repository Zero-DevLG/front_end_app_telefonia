import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';

export const routes: Routes = [
  { path:'', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashbordComponent }
];

export const appRoutesProviders = [
  provideRouter(routes)
]
