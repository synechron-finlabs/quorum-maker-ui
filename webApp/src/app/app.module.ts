import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';

import { HeaderModule } from '../app/components/shared/header/header.module';
import { DashboardModule } from '../app/components/dashboard/dashboard.module';
import { networkModule } from '../app/components/network/network.module';
import { AppComponent } from './app.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
// import { AppService } from '../app/service/app.service';
// import { SubnavComponent } from './components/subnav/subnav.component';


@NgModule({
  declarations: [
    AppComponent,
    FieldErrorDisplayComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HeaderModule,
    DashboardModule,
    networkModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
