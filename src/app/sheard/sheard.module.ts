import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './main-components/header/header.component';
import { SidebarComponent } from './main-components/sidebar/sidebar.component';
import { NbActionsModule, NbContextMenuModule, NbMenuModule, NbUserModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    NbActionsModule,
    NbUserModule,
    FontAwesomeModule,
    NbMenuModule,
    NbContextMenuModule
  ], 
  exports: [
    SidebarComponent,
    HeaderComponent, 
  ]
})
export class SheardModule { }
