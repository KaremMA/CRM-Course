import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './main-components/header/header.component';
import { SidebarComponent } from './main-components/sidebar/sidebar.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbMenuModule, NbUserModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageBoxComponent } from './message-box/message-box.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MessageBoxComponent
  ],
  imports: [
    CommonModule,
    NbActionsModule,
    NbUserModule,
    FontAwesomeModule,
    NbMenuModule,
    NbContextMenuModule,
    NbCardModule,
    NbButtonModule
  ], 
  exports: [
    SidebarComponent,
    HeaderComponent, 
  ]
})
export class SheardModule { }
