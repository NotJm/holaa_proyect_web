// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConectateComponent } from './components/conectate/conectate.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { VerificationComponent } from './components/verification/verification.component';
import { LoginComponent } from './components/login/login.component';
<<<<<<< HEAD
import { OtpGuard } from './guard/otp/otp.guard';
=======
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
>>>>>>> 618e0dd0ff3f1b252bbc97f4a430b5ac6c0490bc

// TODO: Modificacion de rutas
export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'auth/signin', component: ConectateComponent }, 
  { path: 'auth/login', component: LoginComponent},
<<<<<<< HEAD
  { path: 'auth/verify/otp', component: VerificationComponent, canActivate: [OtpGuard] },
=======
  { path: 'auth/verify/otp', component: VerificationComponent},
  { path: 'auth/login-admin', component: LoginAdminComponent},
>>>>>>> 618e0dd0ff3f1b252bbc97f4a430b5ac6c0490bc
  { path: '**', component: PagenotfoundComponent}
];
