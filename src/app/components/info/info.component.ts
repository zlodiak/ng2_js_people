import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { UsersService } from '../../services/users-service.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  private form: FormGroup;
  private authorizedUser: User | boolean;

  constructor(private dialogRef: MatDialogRef<InfoComponent>,
              private usersService: UsersService,
              private globalVarsService: GlobalVarsService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser();
    this.form = new FormGroup({
      'name':     new FormControl(this.authorizedUser['name'] || '', [Validators.required, Validators.minLength(2)], this.haveSpaces.bind(this)),
      'city':     new FormControl(this.authorizedUser['city'] || ''),
      'skills':   new FormControl(this.authorizedUser['skills'] || ''),
      'mobile':   new FormControl(this.authorizedUser['mobile'] || ''),
      'about':    new FormControl(this.authorizedUser['about'] || '')
    });
  }

  private haveSpaces(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.form.value.name.trim()) {
        resolve(null);
      } else {
        resolve({haveSpaces: true});
      }
    });
  }

  private clickCancel() {
    this.dialogRef.close();
  }

  private clickSubmit(): void {
    this.authorizedUser['name'] = this.form.value.name.trim();
    this.authorizedUser['about'] = this.form.value.about;
    this.authorizedUser['mobile'] = this.form.value.mobile;
    this.authorizedUser['city'] = this.form.value.city;
    this.authorizedUser['skills'] = this.form.value.skills;
    this.usersService.setUser(this.authorizedUser).subscribe(() => {
      this.dialogRef.close('saveInfo');
    });
  }

}
