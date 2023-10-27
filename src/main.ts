/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.development';
import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = environment.mapboxApiKey;

if (!navigator.geolocation){
  alert('Browser incompatible with Geolocation');
  throw new Error('Browser incompatible with Geolocation');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


