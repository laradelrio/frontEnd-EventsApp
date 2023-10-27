/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.development';
import mapboxgl from 'mapbox-gl'; 


mapboxgl.accessToken = environment.mapboxApiKey;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


