import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {  MatDialogModule,
          MatButtonModule,
          MatInputModule,
          MatCheckboxModule,
          MatSnackBarModule} from '@angular/material';

import { AgmCoreModule } from '@agm/core';

import { GlobalVarsService } from './services/global-vars.service';
import { HashService } from './services/hash-service.service';
import { UsersService } from './services/users-service.service';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AutoTargetComponent } from './components/auto-target/auto-target.component';
import { InfoComponent } from './components/info/info.component';
import { AnketaComponent } from './components/anketa/anketa.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AutoTargetComponent,
    InfoComponent,
    AnketaComponent
  ],
  imports: [
    MatSnackBarModule,
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
    AnketaComponent,
    InfoComponent,
    AutoTargetComponent,
    LoginComponent,
    RegistrationComponent
  ]
})
export class AppModule { }
