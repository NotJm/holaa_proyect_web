// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConectateComponent } from './components/conectate/conectate.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

// TODO: Modificacion de rutas
export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'auth/conectate', component: ConectateComponent }, 
  { path: '**', component: PagenotfoundComponent}
];
