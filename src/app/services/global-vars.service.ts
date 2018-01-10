import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx'
import { User } from '../interfaces/user';
import 'rxjs/add/operator/map';


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

  getAuthorizedUser(): User | boolean {
    return this.globalVars['authorizedUser'] ? this.globalVars['authorizedUser'] : false;
  }

}
