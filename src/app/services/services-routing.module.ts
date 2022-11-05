import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        redirectTo: 'services-list',
        pathMatch: 'full'
      },
      {
        path: 'services-list',
        loadChildren: () => import("./service-list/service-list.module").then(m => m.ServiceListModule)
      },
      {
        path: 'service-details/:ServiceID_PK',
        loadChildren: () => import("./service-details/service-details.module").then(m => m.ServiceDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
