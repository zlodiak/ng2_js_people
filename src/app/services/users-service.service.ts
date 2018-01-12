import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { User } from '../interfaces/user';
import { Config } from '../config';


@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.httpClient.post(Config.host + 'users', user);
  }

  getUserByEmail(email: string): Observable<any> | any {
    return this.httpClient.get(Config.host + `users?email=${email}`).map((users: User[]) => {
      return users[0] ? users[0] : undefined;
    });
  }

  setUser(user: User): Observable<any> {
    return this.httpClient.put(Config.host + `users/${user.id}`, user);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(Config.host + 'users');
  }

}
