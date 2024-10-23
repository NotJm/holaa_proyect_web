import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private refreshTokenInProgress: boolean = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Obtener el token JWT de localStorage
    const token = this.cookieService.get('token');

    // Clonamos la solicitud y añadimos el token si existe
    if (token) {
      req = this.addTokenToRequest(req, token);
    }

    // Pasamos la solicitud clonada al siguiente manejador
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si obtenemos un 401 Unauthorized, intentamos renovar el token
        if (error.status === HttpStatusCode.Unauthorized) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.cookieService.get('refresh_token');
      if (refreshToken) {
        return this.authService.refresh_token(refreshToken).pipe(
          switchMap((newToken: any) => {
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(newToken);

            // Guardamos el nuevo token en localStorage
            this.cookieService.set('token', newToken);

            // Reintentamos la solicitud original con el nuevo token
            return next.handle(this.addTokenToRequest(req, newToken));
          }),
          catchError((err) => {
            this.refreshTokenInProgress = false;
            this.authService.logout(); // Si falla la renovación del token, cerrar sesión
            return throwError(() => err);
          })
        );
      } else {
        // Si no hay refresh token, cerrar sesión
        this.authService.logout();
        return throwError(() => new Error('No refresh token available'));
      }
    } else {
      // Si ya estamos renovando el token, esperamos a que termine la operación
      return this.refreshTokenSubject.pipe(
        filter((newToken) => newToken != null),
        take(1),
        switchMap((newToken) => {
          return next.handle(this.addTokenToRequest(req, newToken as string));
        })
      );
    }
  }
}
