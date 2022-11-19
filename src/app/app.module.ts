import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconLibraries, NbSidebarModule, NbMenuModule, NbDialogModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ConfigService } from './@services/config.service';
import { TokenIntrsiptService } from './@services/token-intrsipt.service';

const ProjectConfigrations = (config: ConfigService) =>{

  return () => {

      config.LoadConfigrations();
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    FontAwesomeModule,
    HttpClientModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    AgGridModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  providers: [
    {

      provide: APP_INITIALIZER,
      useFactory:  ProjectConfigrations,
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntrsiptService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(
    library:FaIconLibrary,
    private iconLibraries: NbIconLibraries,
    ){
      
    library.addIconPacks(fas, far);
    this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('fab', { packClass: 'fab', iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('fas');
  }
}