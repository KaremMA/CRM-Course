import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private http:HttpClient,
    private config:ConfigService
  ) { }

  getCustomersBySerach(SearchObject):Observable<any>{

    return this.http.post(`${this.config.getAPILink()}/api/CustomersBO/Branches/SearchValue`, SearchObject)
  }
  
  DeleteCustomers(CompanyID_PK):Observable<any>{

    return this.http.delete(`${this.config.getAPILink()}/api/CustomersBO/Company/Remove/${CompanyID_PK}`)
  }

  getByFilter(obj): Observable<any>{

    return this.http.post(`${this.config.getAPILink()}/api/CustomersBO/Companies/AdvancedSearch` ,obj)

   }
}
