import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/autofill.interface';
import { FormGroup } from '@angular/forms';
import { ApiResp } from '../interfaces/interfaces.interface';

@Injectable({
  providedIn: 'root'
})
export class EventDbApiService {

  baseUrl: string = `http://localhost:8080/api`;

  constructor(
    private http: HttpClient,
  ) { }

  //get address options to fill form
  getAddressOptions(url: string): Observable<Address> {
    return this.http.get<Address>(url);
  }

  registerEvent(eventForm: FormGroup): Observable<ApiResp>{
    return this.http.post<ApiResp>(`${this.baseUrl}/users/add`, eventForm.value);
  }


}
