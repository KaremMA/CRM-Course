import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from './service-list.component';
import { ServiceListRoutingModule } from './service-list-routing.module';



@NgModule({
  declarations: [
    ServiceListComponent
  ],
  imports: [
    CommonModule,
    ServiceListRoutingModule
  ]
})
export class ServiceListModule { }
