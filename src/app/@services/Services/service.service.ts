import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http:HttpClient,
    private config:ConfigService
  ) { }

  getServicesList(ServiceFilter):Observable<any>{

    return this.http.post(`${this.config.getAPILink()}/api/Services/Requests/Get`, ServiceFilter)
  }
}
