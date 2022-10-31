import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'services',
        loadChildren: () => import("../services/services.module").then(m => m.ServicesModule)
      },
      {
        path: 'customers',
        loadChildren: () => import("../customers/customers.module").then(m => m.CustomersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
