import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor( 
    private locationService: LocationsService){
  }

  async ngAfterViewInit(){
    let location = await this.locationService.getLocation();
    if(!this.locationService.isLocation()){ throw Error('No placesService.userLocation')};
  
    const map = new Map({
    container: this.mapDivElement.nativeElement, // container where the map wil be rendered
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [location[0], location[1]], // starting position [lng, lat]
    zoom: 15, // starting zoom
    });
  }

}
