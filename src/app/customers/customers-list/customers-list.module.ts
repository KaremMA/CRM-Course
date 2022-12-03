import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersListRoutingModule } from './customers-list-routing.module';
import { CustomersListComponent } from '../customers-list/customers-list.component';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CustomersFilterComponent } from './customers-filter/customers-filter.component';


@NgModule({
  declarations: [
    CustomersListComponent,
    CustomersFilterComponent
  ],
  imports: [
    CommonModule,
    CustomersListRoutingModule,
    NbCardModule,
    NbButtonModule,
    FontAwesomeModule,
    NbInputModule,
    FormsModule,
    AgGridModule
  ]
})
export class CustomersListModule { }
