import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {  MatDialogModule,
          MatButtonModule,
          MatInputModule,
          MatCheckboxModule} from '@angular/material';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { GlobalVarsService } from './services/global-vars.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { HashService } from './services/hash-service.service';
import { UsersService } from './services/users-service.service';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent
  ],
  imports: [
    MatCheckboxModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDT2NO8RgOBPpi3Hph-sjfyE1zyRPAoMnQ'
    })
  ],
  providers: [
    UsersService,
    GlobalVarsService,
    HashService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegistrationComponent
  ]
})
export class AppModule { }
