import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      {
        path: 'add-new-customer',
        loadChildren: () => import("./create-customer/create-customer.module").then(m => m.CreateCustomerModule)
      },
      {
        path: 'customers-list',
        loadChildren: () => import("./customers-list/customers-list.module").then(m => m.CustomersListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
