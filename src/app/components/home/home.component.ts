import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,  
  imports: [RouterModule, LoadingComponent, CommonModule], 
})
export class HomeComponent {}
