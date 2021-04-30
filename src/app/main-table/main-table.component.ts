import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BeerDataService } from '../global-variables/beer-data.service';
import { ColorVariablesService } from '../global-variables/color-variables.service';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.sass']
})
export class MainTableComponent implements OnInit {
  limit1: number = 15;
  limit2: number = 15;
  limit3: number = 15;

  producer1Control = new FormControl('', Validators.required);
  producer2Control = new FormControl('', Validators.required);
  producer3Control = new FormControl('', Validators.required);

  columns: Array<String> = ['producer1', 'producer2', 'producer3']

  constructor(public beerData: BeerDataService, public color: ColorVariablesService) {
    this.producer1Control.setValue(beerData.getProducers()[0])
    this.producer2Control.setValue(beerData.getProducers()[1])
    this.producer3Control.setValue(beerData.getProducers()[2])
  }

  ngOnInit(): void {
  }

  getBeersFiltered(): Array<any> {
    return this.beerData.getBeersByProducers(
      [this.producer1Control.value, this.producer2Control.value, this.producer3Control.value]
    )
  }
}
