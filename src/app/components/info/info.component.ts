import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  private form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'mobile':  new FormControl(''),
      'about':   new FormControl('')
    });
  }

}
