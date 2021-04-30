import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Beer } from '../interfaces/beer';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BeerCardComponent implements OnInit {
  @Input() beer: Beer

  constructor() {
    this.beer = {brewer: "", name: "", type: "", price_per_litre: 0, thumbnail_url: ""};
  }

  ngOnInit(): void {
  }

}
