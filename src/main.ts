import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule),
    provideRouter(routes), // Ajout du routage
    provideHttpClient(), // Ajout de provideHttpClient pour activer HttpClient
  ],
}).catch((err) => console.error(err));
