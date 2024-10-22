import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  isFadingOut = false;

  onAnimationEnd() {
    setTimeout(() => {
      this.isFadingOut = true; 
    }, 100); 
  }
}
