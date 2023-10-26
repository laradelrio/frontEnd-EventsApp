import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { EventDbApiService } from 'src/app/services/event-db-api.service';
import { environment } from './../../../../environments/environment.development';


@Component({
  selector: 'app-autofill-address',
  templateUrl: './autofill-address.component.html',
  styleUrls: ['./autofill-address.component.scss']
})
export class AutofillAddressComponent {

  display: boolean = false;
  addressOptions: string[] = [];
  address: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private eventApi: EventDbApiService,
    ) {
    this.address = this.fb.group({
      input: [],
    })
  }

  //replace space, / and uppercase from input
  optimizeText(inputText: string): string {
    const textWithSpacesReplaced = inputText.replace(/ /g, "%20");
    const textWithReplacements = textWithSpacesReplaced.replace(/\//g, "%2F");
    const finalText = textWithReplacements.toLowerCase();
    return finalText;
  }

  getUrl(): string {
    let input: {} = this.address.get('input')!.value;
    let searchableValue = this.optimizeText(input!.toString());
    let url: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchableValue}.json?country=es&types=address&access_token=${environment.mapboxApiKey}`;
    return url;
  }

  getAddressOptions() {
    this.display = true;
    this.addressOptions = [];
    let url: string = this.getUrl();
  
    this.eventApi.getAddressOptions(url)
    .pipe(
      finalize(()=>{
      this.display = true;
    }))
    .subscribe((res)=>{
      res.features.forEach((place) => {
      this.addressOptions.push(place.place_name)})
    })
  }

  //when an address option is clicked
  selectAddress(address: string) {
    this.address.get('input')?.setValue(address);
    this.display = false;
  }

}


