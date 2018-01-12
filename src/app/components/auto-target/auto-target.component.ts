import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-auto-target',
  templateUrl: './auto-target.component.html',
  styleUrls: ['./auto-target.component.scss']
})
export class AutoTargetComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AutoTargetComponent>) { }

  ngOnInit() {
  }

  private clickCancel() {
    this.dialogRef.close();
  }

  private clickSubmit(): void {
    /*this.subGetUser = this.usersService.getUserByEmail(this.form.value.email).subscribe((user) => {
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
    });*/
  }

}
