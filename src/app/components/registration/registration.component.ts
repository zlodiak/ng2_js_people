import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../interfaces/user';
import { HashService } from '../../services/hash-service.service';
import { UsersService } from '../../services/users-service.service';
import { GlobalVarsService } from '../../services/global-vars.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private subCreateUser: Subscription;
  private subGetUser: Subscription;

  constructor(private dialogRef: MatDialogRef<RegistrationComponent>,
              private hashService: HashService,
              private globalVarsService: GlobalVarsService,
              private usersService: UsersService) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email':      new FormControl('', [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      'password':   new FormControl('', [Validators.required, Validators.minLength(3)]),
      'password2':  new FormControl('', [Validators.required, Validators.minLength(3)], this.comparePasswords.bind(this)),
      'name':       new FormControl('', [Validators.required]),
      'agree':      new FormControl(false, [Validators.requiredTrue])
    });
  }

  ngOnDestroy() {
    if(this.subCreateUser) { this.subCreateUser.unsubscribe(); }
    if(this.subGetUser) { this.subGetUser.unsubscribe(); }
  }

  private clickCancel() {
    this.dialogRef.close();
  }

  private clickSubmit(): void {
    const newUser: User = {
      email: this.form.value.email,
      password: this.hashService.generate(this.form.value.password),
      name: this.form.value.name,
      createdDateUnix: '' + (Date.now() / 1000)
    };

    this.subCreateUser = this.usersService.createUser(newUser).subscribe((user) => {
      this.globalVarsService.setVar('authorizedUser', user);
      this.dialogRef.close();
    });
  }

  private comparePasswords(control: FormControl): Promise<any>  {
    const password = this.form.value.password;
    const password2 = control.value;
    return new Promise((resolve, reject) => {
      if(password === password2) {
        resolve(null);
      } else {
        resolve({comparePasswords: true});
      }
    });
  }

  private forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.subGetUser = this.usersService.getUserByEmail(control.value).subscribe((user: User) => {
        if(user) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      });
    });
  }

}
