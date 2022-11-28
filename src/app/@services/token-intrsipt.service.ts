import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './Auht/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntrsiptService {

  constructor(
    private  auth:AuthService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let newRequst = req.clone({
      setHeaders: {
        "Authorization": `Bearer ${this.auth.getToken()}`,
        'Content-Type': 'application/json'
      },
    });

    return next.handle(newRequst).pipe(
      finalize(() =>{

      })
    );
  }
}
