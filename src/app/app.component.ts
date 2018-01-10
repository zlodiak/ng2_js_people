import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef } from '@angular/material';

import { GlobalVarsService } from './services/global-vars.service';
import { User } from './interfaces/user';
import { RegistrationComponent } from './components/registration/registration.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  private authorizedUserId: string | boolean;
  private authorizedUserName: string | boolean;
  private registrationDialogRef: MatDialogRef<RegistrationComponent>;

  private subGetAuthorizedUser: Subscription;

  constructor(private globalVarsService: GlobalVarsService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.subGetAuthorizedUser = this.globalVarsService.getAuthorizedUser().subscribe(
      (user: User) => {
        this.authorizedUserId = user ? user.id : false;
        this.authorizedUserName = user ? user.name : false;
      },
      err => {
        console.log(err);
      }
    );
  }

  private clickRegistration(): void {
    this.registrationDialogRef = this.dialog.open(RegistrationComponent, {
      hasBackdrop: true,
      data: { title: 'Ошибка!', message: 'messagee' }
    });

    this.registrationDialogRef.afterClosed().subscribe(val => {
      console.log('returned val is :', val);
    });
  }
}
