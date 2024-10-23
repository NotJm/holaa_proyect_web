import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // O el servicio que maneja la autenticación
import { fromEvent, merge, Observable, timer } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private readonly INACTIVITY_TIME = 5000;

  constructor(
    private authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public initInactivityTimer(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Solo se ejecuta en el navegador
      const activityEvents$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'click'),
        fromEvent(document, 'keydown')
      );

      activityEvents$.pipe(switchMap(() => this.resetTimer())).subscribe(() => {
        this.ngZone.run(() => {  
          this.authService.getIsAuthenticated().subscribe({
            next: () => {
                this.notificationService.info('Sesión cerrada por inactividad');
                this.authService.logout();
            }
          })
        });
      });
    }
  }

  // Reiniciar el temporizador de inactividad
  private resetTimer(): Observable<void> {
    return timer(this.INACTIVITY_TIME).pipe(mapTo(undefined));
  }
}
