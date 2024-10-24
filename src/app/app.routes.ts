// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { ConectateComponent } from './components/public/conectate/conectate.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { VerificationComponent } from './components/public/verification/verification.component';
import { LoginComponent } from './components/public/login/login.component';
import { HomeAdminComponent } from './components/admin/home/home-admin.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { PoliticasAdminComponent } from './components/admin/politicas-admin/politicas-admin.component';
import { IncidenciasAdminComponent } from './components/admin/incidencias-admin/incidencias-admin.component';
import { OtpGuard } from './guard/otp.guard';
import { adminGuard } from './guard/admin.guard';
import { LogoAdminComponent } from './components/admin/logo-admin/logo-admin.component';
import { OlvidarPasswordComponent } from './components/public/olvidar-password/olvidar-password.component';
import { VerificarOtpComponent } from './components/public/verificar-otp/verificar-otp.component';
import { CambiarPasswordComponent } from './components/public/cambiar-password/cambiar-password.component';


export const routes: Routes = [
  { path: '', component: HomeComponent},  
  { path: 'signup', component: ConectateComponent}, 
  { path: 'login', component: LoginComponent },
  { path: 'verification/email', component: VerificationComponent, canActivate: [OtpGuard]},
  { path: 'olvidar-pass', component: OlvidarPasswordComponent},
  { path: 'admin', component: HomeAdminComponent, canActivate: [adminGuard],
    children: [
      { path: 'user', component: UserAdminComponent},
      { path: 'politicas', component: PoliticasAdminComponent},
      { path: 'incidencias', component: IncidenciasAdminComponent},
      { path: 'logo', component: LogoAdminComponent},
    ]
   },
  
  { path: '**', component: PagenotfoundComponent}
];
