import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx'
import { User } from '../interfaces/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

@Injectable()
export class GlobalVarsService {

  private globalVars: Object = {};

  constructor() {}

  getVar(key) {
    return this.globalVars[key];
  }

  setVar(key, value): void {
    this.globalVars[key] = value;
  }

  /*getAuthorizedUser_(): User {
    return this.globalVars['authorizedUser'];
  }*/

  getAuthorizedUser(): Observable<User> {
    console.log('getAuthorizedUser');
    return Observable.timer(0, 3000).map(() => {
      return this.globalVars['authorizedUser'];
    });
  }

}
