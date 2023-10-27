import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  
  @ViewChild('mapDiv') mapDivElement!: ElementRef;


  
  ngAfterViewInit(): void {

    //if(!  this.placesSErvice.useLocation) throw Error('No placesService.userLocation');
    //center[this.placesService.useLocation]
    const map = new Map({
    container: this.mapDivElement.nativeElement, // container where the map wil be rendered
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 15, // starting zoom
    });
  }

}
