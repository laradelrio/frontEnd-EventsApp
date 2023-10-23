import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiResp, JWT } from '../interfaces/interfaces.interface';
import { Observable, finalize, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDbService {

  baseUrl: string = `http://localhost:8080/api`;

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(registerForm: FormGroup): Observable<ApiResp>{
    return this.http.post<ApiResp>(`${this.baseUrl}/users/add`, registerForm.value);
  }

  loginUser(loginForm: FormGroup): Observable<JWT>{
    return this.http.post<JWT>(`${this.baseUrl}/users/login`, loginForm.value);
  }

  async isValidToken(){
    const token$ = this.validateToken();
    const tokenAnswer = await lastValueFrom(token$);
     return tokenAnswer.status
  }

  validateToken(): Observable<ApiResp>{
      let tokenJwt =  localStorage.getItem('token');
      return this.http.post<ApiResp>(`${this.baseUrl}/users/validateToken`, {token: tokenJwt});
  }
  
  getInputError(input: string, form: FormGroup): string{
    let errors =  form.controls[input].errors  || {};
    let errorMessage: string = ""
    for(let error of Object.keys(errors)){
      switch(error){
        case 'required':
          errorMessage = "Required field";
          break;
        case 'email':
          errorMessage = 'Please enter a valid email';
          break;
        case 'minlength':
          errorMessage = 'Invalid input';
          break;
      }
    }
    return errorMessage;
  }

  
}