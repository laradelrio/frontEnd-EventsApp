import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiResp, DecodedToken, JWT, Modal, UserData } from '../interfaces/interfaces.interface';
import { Observable, finalize, lastValueFrom } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ApiDbService {

  baseUrl: string = `http://localhost:8080/api`;
  modalInfo: Modal = {
    name: '',
    title: '',
    msg: '',
    confirmBtnName: '',
  };
 

  constructor(
    private http: HttpClient,
  ) { }

  setModal(modalInfo: Modal): void{
    this.modalInfo = modalInfo; 
  }

  registerUser(registerForm: FormGroup): Observable<ApiResp>{
    return this.http.post<ApiResp>(`${this.baseUrl}/users/add`, registerForm.value);
  }

  loginUser(loginForm: FormGroup): Observable<JWT>{
    return this.http.post<JWT>(`${this.baseUrl}/users/login`, loginForm.value);
  }

  //collect token and send status
  async isValidToken(){
    const token$ = this.validateToken();
    const tokenAnswer = await lastValueFrom(token$);
    return tokenAnswer.status
  }

  //get token status
  validateToken(): Observable<ApiResp>{
      let tokenJwt =  localStorage.getItem('token');
      return this.http.post<ApiResp>(`${this.baseUrl}/users/validateToken`, {token: tokenJwt});
  }

  getUserId(): number{
    let tokenJwt = localStorage.getItem('token') || "";
    let decodedToken: DecodedToken = jwt_decode(tokenJwt);
    return decodedToken.id_user;
  }

  getUser(): Observable<UserData>{
    let userId: number = this.getUserId();
    return this.http.get<UserData>(`${this.baseUrl}/users/user/${userId}`);
  }
  
  updateUser(updatedInfo: FormGroup): Observable<ApiResp>{
    let userId:number = this.getUserId();
    return this.http.put<ApiResp>(`${this.baseUrl}/users/update/${userId}`, updatedInfo.value);
  }

  deleteUser(): Observable<ApiResp>{
    let userId:number = this.getUserId();
    return this.http.delete<ApiResp>(`${this.baseUrl}/users/delete/${userId}`)
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
