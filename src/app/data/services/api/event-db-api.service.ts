import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map } from 'rxjs';
import { Address } from '../../interfaces/autofill.interface';
import { FormGroup } from '@angular/forms';
import { ApiResp, EventAPIResp, IbbAPIResp } from '../../interfaces/interfaces.interface';
import { Constants } from '../../constants/constants';
import { UserApiDbService } from './user-db-api.service';

@Injectable({
  providedIn: 'root'
})
export class EventDbApiService {

  baseUrl: string = Constants.DB_API_ENDPOINT;
  eventFormSubmitAction: string = "";
  eventFormApiResp: BehaviorSubject<ApiResp>;

  constructor(
    private http: HttpClient,
    private userService: UserApiDbService,
  ) {
    this.eventFormApiResp = new BehaviorSubject<ApiResp>({ status: false, message: '' });
  }

  onEventFormSubmit(eventForm: FormGroup) {
    // console.log(eventForm.value)
    if (this.eventFormSubmitAction === 'add') {
      this.registerEvent(eventForm)
        .subscribe(
          (resp: ApiResp) => { this.eventFormApiResp.next(resp), console.log(resp) });
    } else if (this.eventFormSubmitAction === 'update') {
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

  getAllEvents(): Observable<EventAPIResp> {
    return this.http.get<EventAPIResp>(`${this.baseUrl}/events`);
  }
  

  registerEvent(eventForm: FormGroup): Observable<ApiResp> {
    return this.http.post<ApiResp>(`${this.baseUrl}/events/add`, eventForm.value);
  }

  uploadImg(file: File): Observable<IbbAPIResp> {
    const formData = new FormData();
    formData.append('image', file)
    return this.http
      .post<IbbAPIResp>('https://api.imgbb.com/1/upload', formData, { params: { key: '659ce9e539f9b7852125e0213ef5e114' } })
  }
}