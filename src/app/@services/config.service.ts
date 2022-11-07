import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  private appCofig:any;

  constructor(private http: HttpClient){}

  LoadConfigrations(){

    return this.http.get("assets/config.json")
    .toPromise()
    .then(
        res=>{

            this.appCofig = res;
        }
    );

}

  getAPILink() {
    
    return this.appCofig.API_IP;
  }

}
