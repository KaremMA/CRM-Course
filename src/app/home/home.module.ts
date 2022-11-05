import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { SheardModule } from '../sheard/sheard.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    NbLayoutModule,
    NbSidebarModule,
    SheardModule
  ]
})
export class HomeModule { }
