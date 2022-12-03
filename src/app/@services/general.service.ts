import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http:HttpClient,
    private config:ConfigService
  ) { }

  getActivities():Observable<any>{

    return this.http.get(`${this.config.getAPILink()}/api/CRMBackOffice/Activities/Get`)
  }

  getCities(): Observable<any>{

    return this.http.get(`${this.config.getAPILink()}/api/CRMBackOffice/Cities/Get`)
  }

  getSystemModuls(): Observable<any>{

    return this.http.get(`${this.config.getAPILink()}/api/CRMBackOffice/RefSystemModule/Get`)

  }

  GetProducts(): Observable<any>{

    return this.http.get(`${this.config.getAPILink()}/api/CRMBackOffice/Products/Get`)
  }
}
