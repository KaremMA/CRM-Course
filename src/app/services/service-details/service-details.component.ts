import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/@services/Services/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  ServiceID_PK:any = 0;

  constructor(
    private aRoute:ActivatedRoute,
    private Service:ServiceService
  ) {

    this.aRoute.paramMap.subscribe({
      next: (v) => {
        console.log(v);

        this.ServiceID_PK =  v.get("ServiceID_PK");
      }
    });
  }

  ServiceDetails:any;


  ngOnInit(): void {

    this.Service.getServiceDetails(this.ServiceID_PK)
    .subscribe({
      next: (res) => {

        console.log(res);
        this.ServiceDetails = res.JsonObject;
      }
    })
  }

}
