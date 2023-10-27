import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/autofill.interface';

@Injectable({
  providedIn: 'root'
})
export class EventDbApiService {

  constructor(
    private http: HttpClient,
  ) { }

  //get address options to fill form
  getAddressOptions(url: string): Observable<Address> {
    return this.http.get<Address>(url);
  }


}
