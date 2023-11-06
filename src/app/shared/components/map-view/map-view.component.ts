import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { LocationsService } from 'src/app/shared/services/locations.service';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
import { finalize } from 'rxjs';
import { Event } from 'src/app/data/interfaces/interfaces.interface';
import { EventComponent } from 'src/app/modules/event/pages/event/event.component';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  events: Event[] = []

  constructor(
    private locationService: LocationsService,
    private eventService: EventDbApiService,
    private router: Router,
   
  ) {

  }

  async ngAfterViewInit() {
    let location = await this.locationService.getLocation();
    if (!this.locationService.isLocation()) { throw Error('No placesService.userLocation') };

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container where the map wil be rendered
      style: 'mapbox://styles/mapbox/navigation-day-v1', // style URL
      center: [location[0], location[1]], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });

    this.getPoints(map)

  }

  getPoints(map: Map) {
    this.eventService.getAllEvents()
      .pipe(
        finalize(() => this.addPopup(map))
      )
      .subscribe((resp) => resp.data.forEach((event) => {
        this.events.push(event)
      }))

  }


  //add popup 
  addPopup(map: Map) {
    this.events.forEach((event) => {
      let popup = new Popup({ closeOnClick: false })
        .setLngLat([event.longitude, event.latitude])
        .setHTML(` <p class='mapPopupText'>${event.name} <i class="fa-solid fa-circle-info ps-3"></i> </p> `)
        .addTo(map)

      popup.getElement().addEventListener('click', eventt => {
        this.openModal(event)
      });

      const mapPopup = document.getElementsByClassName("mapPopupText")[0];
      mapPopup.addEventListener("click", () => {

      
      });
    })
  }

  //open a modal with the event information or REDIRECT TO EVENT INFO
  openModal(event: Event) {
    this.eventService.event = event;
    this.router.navigate(['/event']);
  }

}
