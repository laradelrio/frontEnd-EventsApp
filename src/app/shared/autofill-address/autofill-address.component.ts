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
    coordinatesOptions: number[][] = [];


    constructor(
        private fb: FormBuilder,
        private eventApi: EventDbApiService,
        private locationService: LocationsService,
        

    ) {
        this.address = this.fb.group({
            input: ['', [Validators.required]],
            longitude: ['', Validators.required],
            latitude: ['', Validators.required],
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
        this.coordinatesOptions = [];
        let url: string = await this.getUrl();

        this.eventApi.getAddressOptions(url)
            .pipe(
                finalize(() => {
                    this.display = true;
                }))
            .subscribe((res) => {
                res.features.forEach((place) => {
                    this.coordinatesOptions.push(place.geometry.coordinates);
                    this.addressOptions.push(place.place_name);
                })
            })
    }

    //when an address option is clicked
    selectAddress(address: string, i: number) {

        this.address.markAllAsTouched();
        this.address.get('input')?.setValue(address);
        this.address.get('longitude')?.setValue(this.coordinatesOptions[i][0]),
            this.address.get('latitude')?.setValue(this.coordinatesOptions[i][1]),
            this.display = false;
        this.locationService.location = address;
        this.locationService.longitude = this.coordinatesOptions[i][0];
        this.locationService.latitude = this.coordinatesOptions[i][1];
        this.locationService.validLocation = true;
    }

    

    isValidInput(): boolean | null {
        return !this.address.valid && this.address.controls['input'].touched;
    }

    onSubmit() {

        this.address.markAllAsTouched();
    }
    // getAddress(): string{
    //   console.log('in component',this.address.get('input')!.value)
    //   return this.address.get('input')!.value; 
    // }

    // getCoordinates(): number[]{
    //   return [ this.address.controls['longitude'].value, this.address.controls['latitude'].value ];
    // }

}




