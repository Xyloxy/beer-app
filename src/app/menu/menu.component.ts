import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ColorVariablesService } from '../global-variables/color-variables.service';
import { SettingsVariablesService } from '../global-variables/settings-variables.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  amountControl = new FormControl('', Validators.required);
  typeControl = new FormControl('', Validators.required);

  constructor(public settings: SettingsVariablesService, public color: ColorVariablesService) {
    this.amountControl.setValue(this.settings.getCurrentAmountToLoad())
    this.typeControl.setValue(this.settings.getCurrentTypeFilter())
    
    this.amountControl.valueChanges.subscribe(value => {
      this.settings.setCurrentAmountToLoad(value)
    })

    this.typeControl.valueChanges.subscribe(value => {
      this.settings.setCurrentTypeFilter(value)
    })
  }

  ngOnInit(): void {
  }
}
