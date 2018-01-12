import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from '../../services/users-service.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-auto-target',
  templateUrl: './auto-target.component.html',
  styleUrls: ['./auto-target.component.scss']
})
export class AutoTargetComponent implements OnInit, OnDestroy {

  private authorizedUser: User | boolean;
  private subSetUser: Subscription;

  constructor(private dialogRef: MatDialogRef<AutoTargetComponent>,
              private usersService: UsersService,
              private globalVarsService: GlobalVarsService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser();
  }

  ngOnDestroy() {
    if(this.subSetUser) { this.subSetUser.unsubscribe(); }
  }

  private clickCancel() {
    this.dialogRef.close();
  }

  private clickSubmit(): void {
    this.authorizedUser['lat'] = this.data['lat'];
    this.authorizedUser['lng'] = this.data['lng'];
    this.usersService.setUser(this.authorizedUser).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
