import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

import { GlobalVarsService } from './services/global-vars.service';
import { UsersService } from './services/users-service.service';

import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AutoTargetComponent } from './components/auto-target/auto-target.component';

import { Config } from './config';
import { User } from './interfaces/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private lat: number;
  private lng: number;
  private users: User[] = [];
  private markerMode: boolean = false;
  private authorizedUser: User | boolean;
  private registrationDialogRef: MatDialogRef<RegistrationComponent>;
  private loginDialogRef: MatDialogRef<LoginComponent>;
  private autoTargetingDialogRef: MatDialogRef<AutoTargetComponent>;

  private subGetUsers: Subscription;
  private subSetUser: Subscription;
  private subAfterClosed: Subscription;

  constructor(private globalVarsService: GlobalVarsService,
              private usersService: UsersService,
              public snackBar: MatSnackBar,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser();
    this.getUsers();
    this.startGeolocation();
  }

  ngOnDestroy() {
    if(this.subGetUsers) { this.subGetUsers.unsubscribe(); }
    if(this.subSetUser) { this.subSetUser.unsubscribe(); }
    if(this.subAfterClosed) { this.subAfterClosed.unsubscribe(); }
  }

  private clickRegistration(): void {
    this.registrationDialogRef = this.dialog.open(RegistrationComponent, {});
    this.subAfterClosed = this.registrationDialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  private clickLogin(): void {
    this.loginDialogRef = this.dialog.open(LoginComponent, {});
    this.subAfterClosed = this.loginDialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  private getUsers(): void {
    this.subGetUsers = this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  private logout(): void {
    this.globalVarsService.setVar('authorizedUser', undefined);
    this.ngOnInit();
  }

  private setMarker(ev): void {
    if(this.markerMode) {
      this.markerMode = false;
      this.authorizedUser['lat'] = ev.coords.lat;
      this.authorizedUser['lng'] = ev.coords.lng;
      this.subSetUser = this.usersService.setUser(this.authorizedUser).subscribe((user) => {
        this.getUsers();
      });
    }
  }

  private startGeolocation() {
    if (navigator.geolocation) {
      const this_ = this;

      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        if(this.authorizedUser && (!this.authorizedUser['lat'] || !this.authorizedUser['lng'])) {
          this.autoTargetingDialogRef = this.dialog.open(AutoTargetComponent, {});
          this.subAfterClosed = this.autoTargetingDialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
          });
        }
      });
    } else {
      this.snackBar.open('Геолокация не поддерживается вашим браузером', 'OK', {
        duration: Config.timePeriod
      });
    }
  }

}
