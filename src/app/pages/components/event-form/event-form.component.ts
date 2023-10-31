import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, finalize } from 'rxjs';
import { Event } from 'src/app/interfaces/interfaces.interface';
import { EventDbApiService } from 'src/app/services/event-db-api.service';
import { FormService } from 'src/app/services/form.service';
import { LocationsService } from 'src/app/services/locations.service';
import { UserApiDbService } from 'src/app/services/user-db-api.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {

  todayDate: string = new Date().toISOString().slice(0, 10)
  eventForm: FormGroup;
  display: boolean = false;
  addressOptions: string[] = [];
  coordinatesOptions: number[][] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private userService: UserApiDbService,
    private locationService: LocationsService,
    private eventApi: EventDbApiService,
  ) {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      user_id: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', [Validators.required, this.validateDate]],
      time: ['', Validators.required],

      address: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],

    })
  }

  validateDate(control: AbstractControl): { [key: string]: any } | null {
    let inputDate: Date = new Date(control.value);
    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      return { 'dateInvalid': true };
    }
    return null;
  }

  isValidInput(input: string): boolean | null {
    return this.eventForm.controls[input].errors && this.eventForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.formService.getInputError(field, this.eventForm);
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventForm.get('user_id')?.setValue(this.userService.getUserId());
      //send form
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

  //replace space, / and uppercase from typed address
  optimizeText(inputText: string): string {
    const textWithSpacesReplaced = inputText.replace(/ /g, "%20");
    const textWithReplacements = textWithSpacesReplaced.replace(/\//g, "%2F");
    const finalText = textWithReplacements.toLowerCase();
    return finalText;
  }
  
  //return the url to search fro the address options
  async getUrl(): Promise<string> {
    let input: {} = this.eventForm.get('address')!.value;
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
    this.eventForm.get('address')?.setValue(address)
    this.eventForm.get('longitude')?.setValue(this.coordinatesOptions[i][0]),
      this.eventForm.get('latitude')?.setValue(this.coordinatesOptions[i][1]),
      this.display = false;
  }

  isValidAddress(): boolean | null {
    return !(this.eventForm.get('address')?.valid && this.eventForm.get('latitude')?.valid && this.eventForm.get('longitude')?.valid) && this.eventForm.controls['address'].touched;
  }

  //when the user touches the address input, the coordinates are deleted to avoid location errors and force them to research a valid option
  deleteCoordinates() {
    this.eventForm.get('longitude')?.setValue('');
    this.eventForm.get('latitude')?.setValue('');
  }

}


