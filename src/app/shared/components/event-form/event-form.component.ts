import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
import { FormService } from 'src/app/shared/services/form.service';
import { LocationsService } from 'src/app/shared/services/locations.service';
import { UserApiDbService } from 'src/app/data/services/api/user-db-api.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';



@Component({
  selector: 'app-shared-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit{

  @Input() formTitle!: string;
  @ViewChild('imageInput')  imgInput!: HTMLInputElement;
  @Output() submitForm = new EventEmitter<[number, FormGroup]>();

  todayDate: string = new Date().toISOString().slice(0, 10)
  eventForm: FormGroup;
  display: boolean = false;
  addressOptions: string[] = [];
  coordinatesOptions: number[][] = [];
  selectedFile!: File;
  existingEventId: number = 0;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private userService: UserApiDbService,
    private locationService: LocationsService,
    private eventDbApiService: EventDbApiService,
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
      longitude: [0, [Validators.required]],
      latitude: [0, [Validators.required]],
      image: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    if(this.eventDbApiService.eventFormSubmitAction === 'update'){
      this.fillInForm();
    }
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
    this.eventForm.get('user_id')?.setValue(this.userService.getUserId());
    if (this.eventForm.valid) {
      this.submitForm.emit([this.existingEventId, this.eventForm]);
      this.eventForm.reset();
      this.chooseFileTouched = false;
      this.imgInput.value = '';
    } else {
      this.eventForm.markAllAsTouched();
      this.chooseFileTouched = true;
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
    this.eventForm.get('longitude')?.setValue((this.coordinatesOptions[i][0])),
      this.eventForm.get('latitude')?.setValue((this.coordinatesOptions[i][1])),
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
  chooseFileTouched: boolean = false;

  //Image
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    
    this.eventDbApiService.uploadImg(this.selectedFile)
    .subscribe( (res) => {
      if(res.success){
        this.eventForm.get('image')?.setValue(res.data.display_url)
      }
    })

  }

  chooseImgTouched(){
    this.chooseFileTouched = true;
  }

  fillInForm(){
    let event = this.eventDbApiService.event;
    this.existingEventId = event.id_event;
    this.eventForm.get('name')?.setValue(`${event.name}`);
    this.eventForm.get('user_id')?.setValue(`${event.user_id}`);
    this.eventForm.get('category')?.setValue(`${event.category}`);
    this.eventForm.get('description')?.setValue(`${event.description}`);
    let date = (event.date).toString().slice(0, 10)
    this.eventForm.get('date')?.setValue(date);
    this.eventForm.get('time')?.setValue(`${event.time}`);
    this.eventForm.get('address')?.setValue(`${event.address}`);
    this.eventForm.get('longitude')?.setValue(`${event.longitude}`);
    this.eventForm.get('latitude')?.setValue(`${event.latitude}`);
    this.eventForm.get('image')?.setValue(`${event.image}`);
  }

}

