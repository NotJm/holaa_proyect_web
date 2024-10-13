import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';  // Importa Router
import { routes } from './app/app.routes';  // Importa las rutas definidas
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';  // Configuración adicional si es necesaria

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Proveer las rutas aquí
    ...appConfig.providers, // Si tienes más configuraciones
  ],
}).catch((err) => console.error(err));
