import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from '../../services/users-service.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-anketa',
  templateUrl: './anketa.component.html',
  styleUrls: ['./anketa.component.scss']
})
export class AnketaComponent implements OnInit, OnDestroy {

  private selectedUser: User | boolean;
  private subGetUser: Subscription;

  constructor(private dialogRef: MatDialogRef<AnketaComponent>,
              private usersService: UsersService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.subGetUser = this.usersService.getUserByEmail(this.data.userEmail).subscribe((user) => {
      this.selectedUser = user;
    });
  }

  ngOnDestroy() {
    if(this.subGetUser) { this.subGetUser.unsubscribe(); }
  }

}
