import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map } from 'rxjs';
import { Address } from '../../interfaces/autofill.interface';
import { FormGroup } from '@angular/forms';
import { ApiResp, CountApiResp, Event, EventAPIResp, IbbAPIResp } from '../../interfaces/interfaces.interface';
import { Constants } from '../../constants/constants';
import { UserApiDbService } from './user-db-api.service';
import { environment } from './../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventDbApiService {

  baseUrl: string = Constants.DB_API_ENDPOINT;
  ibbApiUrl: string = Constants.IBB_API_URL;
  ibbApiKey: string = environment.ibbApiKey;
  eventFormSubmitAction: string = "";
  eventFormApiResp: BehaviorSubject<ApiResp>;
  event!: Event;

  constructor(
    private http: HttpClient,
    private userService: UserApiDbService,
  ) {
    this.eventFormApiResp = new BehaviorSubject<ApiResp>({ status: false, message: '' });
  }

  onEventFormSubmit(eventForm: FormGroup, eventId: number) {
    if (this.eventFormSubmitAction === 'add') {
      this.registerEvent(eventForm)
        .subscribe(
          (resp: ApiResp) => { this.eventFormApiResp.next(resp) });
    } else if (this.eventFormSubmitAction === 'update') {
      this.updateEvent(eventId, eventForm)
      .subscribe(
        (resp: ApiResp) => { this.eventFormApiResp.next(resp), console.log(resp) });
    }
  }

  getEventFormApiResp(): Observable<ApiResp> {
    return this.eventFormApiResp.asObservable()
  }

  //get address options to fill form
  getAddressOptions(url: string): Observable<Address> {
    return this.http.get<Address>(url);
  }

  getEventsByUser(): Observable<EventAPIResp> {
    let userId: number = this.userService.getUserId();
    return this.http.get<EventAPIResp>(`${this.baseUrl}/events/user/${userId}`);
  }

  getEventsById(eventId: string): Observable<EventAPIResp> {
    let id = parseInt(eventId);
    return this.http.get<EventAPIResp>(`${this.baseUrl}/events/event/${id}`);
  }

  getAllEvents(): Observable<EventAPIResp> {
    return this.http.get<EventAPIResp>(`${this.baseUrl}/events`);
  }
  
  getCountByCategory(): Observable<CountApiResp>{
    return this.http.get<CountApiResp>(`${this.baseUrl}/events/categories/count`);
  }

  registerEvent(eventForm: FormGroup): Observable<ApiResp> {
    return this.http.post<ApiResp>(`${this.baseUrl}/events/add`, eventForm.value);
  }

  uploadImg(file: File): Observable<IbbAPIResp> {
    const formData = new FormData();
    formData.append('image', file)
    return this.http
      .post<IbbAPIResp>(this.ibbApiUrl, formData, { params: { key: this.ibbApiKey } })
  }

  updateEvent(eventId: number, form: FormGroup): Observable<ApiResp>{
    return this.http.put<ApiResp>(`${this.baseUrl}/events/update/${eventId}`, form.value)
  }

  deleteEvent(id: number): Observable<ApiResp>{
  return this.http.delete<ApiResp>(`${this.baseUrl}/events/delete/${id}`)
  }
}