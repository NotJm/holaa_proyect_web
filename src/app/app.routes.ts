// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { ConectateComponent } from './components/public/conectate/conectate.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { VerificationComponent } from './components/public/verification/verification.component';
import { LoginComponent } from './components/public/login/login.component';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { HomeAdminComponent } from './components/admin/home/home-admin.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { PoliticasAdminComponent } from './components/admin/politicas-admin/politicas-admin.component';
import { IncidenciasAdminComponent } from './components/admin/incidencias-admin/incidencias-admin.component';
import { OtpGuard } from './guard/otp.guard';
import { AdminAuthGuard } from './guard/admin.auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent},  
  { path: 'auth/signin', component: ConectateComponent,  }, 
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/verify/otp', component: VerificationComponent, canActivate: [OtpGuard]},
  { path: 'admin', component: HomeAdminComponent, canActivate: [AdminAuthGuard],
    children: [
      { path: 'user', component: UserAdminComponent},
      { path: 'politicas', component: PoliticasAdminComponent},
      { path: 'incidencias', component: IncidenciasAdminComponent},
    ]
   },
  
  { path: '**', component: PagenotfoundComponent}
];
