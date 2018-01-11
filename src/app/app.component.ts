import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { GlobalVarsService } from './services/global-vars.service';
import { User } from './interfaces/user';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  private authorizedUser: User | boolean;
  private registrationDialogRef: MatDialogRef<RegistrationComponent>;
  private loginDialogRef: MatDialogRef<LoginComponent>;

  constructor(private globalVarsService: GlobalVarsService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser();
  }

  private clickRegistration(): void {
    this.registrationDialogRef = this.dialog.open(RegistrationComponent, {});
    this.registrationDialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  private clickLogin(): void {
    this.loginDialogRef = this.dialog.open(LoginComponent, {});
    this.loginDialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  private logout(): void {
    console.log('logout');
  }



}
