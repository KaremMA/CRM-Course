import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private config:ConfigService
  ) { }

  LogInToSystem(LogInObject:any):Observable<any>{

    return this.http.post(`${this.config.getAPILink()}/api/Users/Login`, LogInObject);
  }

  getToken(){

    return localStorage.getItem("Token");
  }
}