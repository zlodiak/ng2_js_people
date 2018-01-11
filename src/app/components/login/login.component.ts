import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../../services/users-service.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { HashService } from '../../services/hash-service.service';
import { Config } from '../../config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  private isShowError: boolean = false;

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private globalVarsService: GlobalVarsService,
              private hashService: HashService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email':      new FormControl('', [Validators.required]),
      'password':   new FormControl('', [Validators.required])
    });
  }

  private clickCancel() {
    this.dialogRef.close();
  }

  private clickSubmit(): void {
    this.usersService.getUserByEmail(this.form.value.email).subscribe((user) => {
      const passwordHash = this.hashService.generate(this.form.value.password);

      if(user && passwordHash === user.password) {
        this.globalVarsService.setVar('authorizedUser', user);
        this.dialogRef.close();
      } else {
        this.isShowError = true;
        setTimeout(() => {
          this.isShowError = false;
        }, Config.timePeriod);
      }
    });
  }

}
