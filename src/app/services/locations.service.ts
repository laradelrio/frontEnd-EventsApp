import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDbApiService } from './event-db-api.service';
import { FormService } from './form.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {


  userLocation?: [number, number] ;
  
  location: string = '';
  longitude: number = 0;
  latitude: number = 0;
  validLocation: boolean = false;


  //returns if location has been found or not
  isLocation(): boolean{
    if (this.userLocation === undefined){
      return false; 
    }else {
      return true;
    }
  }
  
  //returns user's current location
  async getLocation(): Promise<[number, number]> {
    if (this.userLocation === undefined){
      let getCurrentUserLocation = this.getCurrentUserLocation();
      let location = await getCurrentUserLocation;
      this.userLocation = [location[0], location[1]]
      return this.userLocation; 
    }else {
      return this.userLocation;
    }
  }

  //gets user's current location
  async getCurrentUserLocation(): Promise<[number, number]>{
    return new Promise ((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [ coords.longitude, coords.latitude ];
          resolve([ coords.longitude, coords.latitude ]);
        },
        (err) => {
          alert('Not geolocation obtained');
          reject;
        }
      )

    })
  }

}
