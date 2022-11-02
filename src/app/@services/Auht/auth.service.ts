import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  LogInToSystem(LogInObject:any):Observable<any>{

    return this.http.post('http://135.181.133.173:8080/AsaryaSoftCRMAPI/v1//api/Users/Login', LogInObject);
  }
}