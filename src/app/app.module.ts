import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgxSoapModule } from 'ngx-soap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './components/template/template.component';
import { DataComponent } from './components/data/data.component';
import { SoapComponent } from './components/soap/soap.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { APP_ROUTING } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    DataComponent,
    SoapComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    NgxSoapModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
