// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConectateComponent } from './components/conectate/conectate.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { VerificationComponent } from './components/verification/verification.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';

// TODO: Modificacion de rutas
export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'auth/signin', component: ConectateComponent }, 
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/verify/otp', component: VerificationComponent},
  { path: 'auth/login-admin', component: LoginAdminComponent},
  { path: '**', component: PagenotfoundComponent}
];
