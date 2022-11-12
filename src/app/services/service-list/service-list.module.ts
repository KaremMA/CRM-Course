import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from './service-list.component';
import { ServiceListRoutingModule } from './service-list-routing.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbPopoverModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceFilterComponent } from './service-filter/service-filter.component';
import { CreateServicesComponent } from './create-services/create-services.component';



@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceFilterComponent,
    CreateServicesComponent
  ],
  imports: [
    CommonModule,
    ServiceListRoutingModule,
    NbCardModule,
    NbButtonModule,
    FormsModule,
    AgGridModule,
    NbActionsModule,
    FontAwesomeModule,
    NbPopoverModule
  ]
})
export class ServiceListModule { }
