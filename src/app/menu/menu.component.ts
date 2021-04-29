import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalVariablesService } from '../global-variables/global-variables.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  amountControl = new FormControl('', Validators.required);
  firmControl = new FormControl('', Validators.required);

  constructor(public global: GlobalVariablesService) {
    this.amountControl.setValue(15)
    this.firmControl.setValue("0")
  }

  ngOnInit(): void {
  }
}
