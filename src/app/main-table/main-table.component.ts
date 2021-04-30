import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BeerDataService } from '../global-variables/beer-data.service';
import { ColorVariablesService } from '../global-variables/color-variables.service';
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

  constructor(public beerData: BeerDataService, public color: ColorVariablesService, public settings: SettingsVariablesService) {
    this.producer1Control.setValue(beerData.getProducers()[0])
    this.producer2Control.setValue(beerData.getProducers()[1])
    this.producer3Control.setValue(beerData.getProducers()[2])
    this.producer1Control.valueChanges.subscribe((v) => {
      this.limits[0] = 15;
    })
    this.producer2Control.valueChanges.subscribe((v) => {
      this.limits[1] = 15;
    })
    this.producer3Control.valueChanges.subscribe((v) => {
      this.limits[2] = 15;
    })
  }

  ngOnInit(): void {
  }

  /**
   * getBeersFiltered()
   * 
   * Retrieves and returns sorted beers from BeerDataService
   * 
   * @return Array
   */
  getBeersFiltered(): Array<Array<Beer | undefined>> {
    return this.beerData.getBeersFiltered(
      [this.producer1Control.value, this.producer2Control.value, this.producer3Control.value],
      this.limits
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
