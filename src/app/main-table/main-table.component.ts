import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BeerDataService } from '../global-variables/beer-data.service';
import { ColorVariablesService } from '../global-variables/color-variables.service';
import { LocalStorageService } from '../global-variables/local-storage.service';
import { SettingsVariablesService } from '../global-variables/settings-variables.service';
import { Beer } from '../interfaces/beer';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.sass']
})
export class MainTableComponent implements OnInit {
  limits: Array<number> = [15, 15, 15];

  producer1Control = new FormControl('', Validators.required);
  producer2Control = new FormControl('', Validators.required);
  producer3Control = new FormControl('', Validators.required);

  beers: Array<Array<Beer | undefined>> = [];

  columns: Array<String> = ['producer1', 'producer2', 'producer3']

  constructor(public beerData: BeerDataService, public color: ColorVariablesService, public settings: SettingsVariablesService, private local: LocalStorageService) {
    let data: any = this.local.loadOptions("beers")
    if (data != undefined) {
      this.producer1Control.setValue(data.p1)
      this.producer2Control.setValue(data.p2)
      this.producer3Control.setValue(data.p3)
    }
    
    this.producer1Control.valueChanges.subscribe((v) => {
      this.saveControls()
      this.limits[0] = 15;
    })
    this.producer2Control.valueChanges.subscribe((v) => {
      this.saveControls()
      this.limits[1] = 15;
    })
    this.producer3Control.valueChanges.subscribe((v) => {
      this.saveControls()
      this.limits[2] = 15;
    })
  }

  ngOnInit(): void {
  }

  /**
   * saveControls()
   * 
   * Saves values locally
   * 
   * @returns void
   */
  public saveControls(): void {
    this.local.saveOptions("beers", {
      p1: this.producer1Control.value,
      p2: this.producer2Control.value,
      p3: this.producer3Control.value
    })
  }

  /**
   * getBeersFiltered()
   * 
   * Retrieves and returns sorted beers from BeerDataService
   * 
   * @return Array
   */
  getBeersFiltered(): Array<Array<Beer | undefined>> {
    // For some reason accessing each element of array separately solves issue of table not updating
    return this.beerData.getBeersFiltered(
      [this.producer1Control.value, this.producer2Control.value, this.producer3Control.value],
      [this.limits[0], this.limits[1], this.limits[2]]
    )
  }
  
  /**
   * addLimit(index)
   * 
   * Adds next chosen amount to limits
   * 
   * @returns void
   */
  addLimit(index: number): void {
    let lim = this.limits
    lim[index] += this.getAmountToAdd(index)
    this.limits = lim
  }

  /**
   * addLimitWithoutCompesation(index)
   * 
   * Adds next chosen amount to limits
   * without compensating for current amount
   * 
   * @returns void
   */
   addLimitWithoutCompesation(index: number): void {
    let lim = this.limits
    lim[index] += this.settings.getCurrentAmountToLoad()
    this.limits = lim
  }

  /**
   * getAmountToAdd(index)
   * 
   * Returns amount to add based on Math.min(amountLeft, loadAmount)
   * 
   * @returns number
   */
  getAmountToAdd(index: number): number {
    return Math.min(this.beerData.getLimitsOverride()[index], this.settings.getCurrentAmountToLoad())
  }
}
