import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

import { GlobalVarsService } from './services/global-vars.service';
import { UsersService } from './services/users-service.service';

import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { InfoComponent } from './components/info/info.component';
import { AnketaComponent } from './components/anketa/anketa.component';
import { AutoTargetComponent } from './components/auto-target/auto-target.component';

import { Config } from './config';
import { User } from './interfaces/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private isSelectedAutoTarget: boolean = false;
  private lat: number;
  private lng: number;
  private users: User[] = [];
  private markerMode: boolean = false;
  private authorizedUser: User | boolean;
  private target = '/assets/imgs/target.png';

  private registrationDialogRef: MatDialogRef<RegistrationComponent>;
  private loginDialogRef: MatDialogRef<LoginComponent>;
  private infoDialogRef: MatDialogRef<InfoComponent>;
  private autoTargetingDialogRef: MatDialogRef<AutoTargetComponent>;
  private anketaDialogRef: MatDialogRef<AnketaComponent>;

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

  private clickInfo(): void {
    this.infoDialogRef = this.dialog.open(InfoComponent, {width: '500px'});
    this.subAfterClosed = this.infoDialogRef.afterClosed().subscribe((resp) => {
      this.ngOnInit();
      if(resp === 'saveInfo') {
        this.snackBar.open('Данные анкеты сохранены', 'OK', {
          duration: Config.timePeriod
        });
      }
    })
  }

  private clickRegistration(): void {
    this.registrationDialogRef = this.dialog.open(RegistrationComponent, {});
    this.subAfterClosed = this.registrationDialogRef.afterClosed().subscribe((resp) => {
      this.ngOnInit();
      if(resp === 'okRegistration') {
        this.snackBar.open('Вы успешно зарегистрировались в системе', 'OK', {
          duration: Config.timePeriod
        });
      }
    });
  }

  private clickLogin(): void {
    this.loginDialogRef = this.dialog.open(LoginComponent, {});
    this.subAfterClosed = this.loginDialogRef.afterClosed().subscribe((resp) => {
      this.ngOnInit();
      if(resp === 'okLogin') {
        this.snackBar.open('Вы успешно авторизовались в системе', 'OK', {
          duration: Config.timePeriod
        });
      }
    });
  }

  private openAnketa(userEmail): void {
    this.anketaDialogRef = this.dialog.open(AnketaComponent, {
      width: '400px',
      data: {userEmail: userEmail}
    });
  }

  private logout(): void {
    this.globalVarsService.setVar('authorizedUser', undefined);
    this.ngOnInit();
    this.snackBar.open('Вы вышли из системы', 'OK', {
      duration: Config.timePeriod
    });
  }

  private getUsers(): void {
    this.subGetUsers = this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  private setMarker(ev): void {
    if(this.markerMode) {
      this.markerMode = false;
      this.authorizedUser['lat'] = ev.coords.lat;
      this.authorizedUser['lng'] = ev.coords.lng;
      this.subSetUser = this.usersService.setUser(this.authorizedUser).subscribe((user) => {
        this.getUsers();
        this.snackBar.open('Маркер поставлен', 'OK', {
          duration: Config.timePeriod
        });
      });
    }
  }

  private startGeolocation() {
    if (navigator.geolocation) {
      const this_ = this;

      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        if(!this.isSelectedAutoTarget && this.authorizedUser && (!this.authorizedUser['lat'] || !this.authorizedUser['lng'])) {
          this.autoTargetingDialogRef = this.dialog.open(AutoTargetComponent, {data: {
            lat: this.lat,
            lng: this.lng
          }});

          this.subAfterClosed = this.autoTargetingDialogRef.afterClosed().subscribe(() => {
            this.isSelectedAutoTarget = true;
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
