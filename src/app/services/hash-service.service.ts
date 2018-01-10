import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Md5 } from 'ts-md5/dist/md5';


@Injectable()
export class HashService {

  constructor() { }

  generate(str): any{
    return Md5.hashStr(str);
  }

}

