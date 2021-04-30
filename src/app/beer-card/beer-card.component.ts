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
    // Creates basic entity to be filled from @Input
    // (Required by Angular Strict)
    this.beer = {brewer: "", name: "", type: "", price_per_litre: 0, thumbnail_url: ""};
  }

  ngOnInit(): void {
  }

  /**
   * iconClick()
   * 
   * Fullscreens icon
   * 
   * @returns void
   */
  iconClick(icon: HTMLElement): void {
    if (icon.classList.contains("icon_fullscreen")) {
      icon.classList.remove("icon_fullscreen")
    }
    else {
      icon.classList.add("icon_fullscreen")
    }
  }

}
