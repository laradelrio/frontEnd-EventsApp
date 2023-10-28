import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { EventDbApiService } from 'src/app/services/event-db-api.service';
import { environment } from '../../../environments/environment.development';
import { LocationsService } from 'src/app/services/locations.service';


@Component({
  selector: 'app-autofill-address',
  templateUrl: './autofill-address.component.html',
  styleUrls: ['./autofill-address.component.scss']
})
export class AutofillAddressComponent {

  display: boolean = false;
  addressOptions: string[] = [];
  address: FormGroup;
  isTouched: boolean = false;
  coordinates: number[] | undefined = undefined;

  constructor( 
    private fb: FormBuilder,
    private eventApi: EventDbApiService,
    private locationService: LocationsService,
    ) {
    this.address = this.fb.group({
      input: ['', [Validators.required]],
    })
  }

  //replace space, / and uppercase from input
  optimizeText(inputText: string): string {
    const textWithSpacesReplaced = inputText.replace(/ /g, "%20");
    const textWithReplacements = textWithSpacesReplaced.replace(/\//g, "%2F");
    const finalText = textWithReplacements.toLowerCase();
    return finalText;
  }

  async getUrl(): Promise<string> {
    let input: {} = this.address.get('input')!.value; 
    let searchableValue = this.optimizeText(input!.toString());
    let location = await this.locationService.getLocation();
    let url: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchableValue}.json?proximity=${location[0]}%2C${location[1]}&types=address&access_token=${environment.mapboxApiKey}`;
    return url;
  }

  async getAddressOptions() {
    this.display = true;
    this.addressOptions = [];
    let url: string = await this.getUrl();
    
    this.eventApi.getAddressOptions(url)
    .pipe(
      finalize(()=>{
      this.display = true;
    }))
    .subscribe((res)=>{
      res.features.forEach((place) => {
        this.coordinates = place.geometry.coordinates;
        this.addressOptions.push(place.place_name);
      })
    })
  }

  //when an address option is clicked
  selectAddress(address: string) {
    this.address.get('input')?.setValue(address);
    this.display = false;
  }

  inputTouched(){
    this.isTouched = true;
  }

  isValidInput(): boolean | null{
    return this.address.controls['input'].errors && this.address.controls['input'].touched && !this.hasCoordinates();
  }

  getAddress(): string{
    return this.address.get('input')!.value; 
  }

  getCoordinates(): number[]{
    return this.coordinates!;
  }

  hasCoordinates(): boolean{
    if(this.coordinates === undefined){
      return false;
    } else{
      return true;
    }
  }

}




