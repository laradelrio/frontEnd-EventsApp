import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
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
    private locationService: LocationsService) {
  }

  async ngAfterViewInit() {
    let location = await this.locationService.getLocation();
    if (!this.locationService.isLocation()) { throw Error('No placesService.userLocation') };

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container where the map wil be rendered
      style: 'mapbox://styles/mapbox/navigation-day-v1', // style URL
      center: [location[0], location[1]], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    this.addPopup(map)

  }

  //events from DB - SET UP CORRECT INTERFACE
  events: {coordinates: [number, number], title: string}[] = [
    {
      coordinates: [0,0],
      title: 'asdg'
    },
    {
      coordinates: [1,1],
      title: 'fasdf'
    
    },
    ]

  //add popup 
  addPopup(map: Map){
  this.events.forEach((event) =>{
  let popup = new Popup({ closeOnClick: false })
      .setLngLat(event.coordinates)
      .setHTML(`<p (click)=openModal()>${event.title}</p>`)
      .addTo(map)


      popup.getElement().addEventListener('click', eventt => {
        this.openModal(event.title)
      });
    })
  }

  //open a modal with the event information or REDIRECT TO EVENT INFO
  openModal(word: string){
    console.log(word);   
  }

}
  