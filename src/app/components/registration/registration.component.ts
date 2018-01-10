import { Component, OnInit } from '@angular/core';
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
export class RegistrationComponent implements OnInit {

  private form: FormGroup;
  private subCreateUser: Subscription;

  constructor(private dialogRef: MatDialogRef<RegistrationComponent>,
              private hashService: HashService,
              private globalVarsService: GlobalVarsService,
              private usersService: UsersService) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email':      new FormControl('', [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      'password':   new FormControl('', [Validators.required, Validators.minLength(6)]),
      'name':       new FormControl('', [Validators.required]),
      'agree':      new FormControl(false, [Validators.requiredTrue])
    });
  }

  private clickCancel() {
    this.dialogRef.close();
  }

  private onSubmit(): void {
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

  private forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value).subscribe((user: User) => {
        console.log(user);
        if(user) {
          console.log(11);
          resolve({forbiddenEmail: true});
        } else {
          console.log(22);
          resolve(null);
        }
      });
    });
  }

}
