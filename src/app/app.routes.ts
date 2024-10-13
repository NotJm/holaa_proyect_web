// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConectateComponent } from './components/conectate/conectate.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta principal (home)
  { path: 'conectate', component: ConectateComponent },  // Ruta para Registro
];
