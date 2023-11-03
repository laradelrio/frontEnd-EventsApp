import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiResp, DecodedToken, JWT, UserData } from '../../interfaces/interfaces.interface';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import jwt_decode from "jwt-decode";
import { Constants } from '../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class UserApiDbService {

  baseUrl: string = Constants.DB_API_ENDPOINT;
  accountFormApiResp: BehaviorSubject<ApiResp>;

  constructor(
    private http: HttpClient,
  ) { 
    this.accountFormApiResp = new BehaviorSubject<ApiResp>({ status: false, message: ''});
  }

  getAccountFormApiResp(): Observable<ApiResp>{
    return this.accountFormApiResp.asObservable()
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

  updatePassword(updatedPassword: FormGroup): Observable<ApiResp>{
    let userId:number = this.getUserId();
    return this.http.put<ApiResp>(`${this.baseUrl}/users/update/password/${userId}`, updatedPassword.value);
  }

  deleteUser(): Observable<ApiResp>{
    let userId:number = this.getUserId();
    return this.http.delete<ApiResp>(`${this.baseUrl}/users/delete/${userId}`)
  }

}
