import { Injectable } from '@angular/core';
import { Beer } from '../interfaces/beer';
import mockData from '../../assets/mockData.json';
import { SettingsVariablesService } from './settings-variables.service';

@Injectable({
  providedIn: 'root'
})
export class BeerDataService {

  // Values to optimize Angular calls for getBeersByProducers
  // If they weren't used the code would execute 10x in a row
  // which makes no sense to do
  private previous_producers: Array<String> = []
  private previous_limits: Array<Number> = []
  private previous_filter: String = ""
  private previous_beers: Array<Array<Beer | undefined>> = []
  private previous_beers_filtered: Array<Array<Beer | undefined>> = []
  private limits_override: Array<number> = [0, 0, 0]

  // Values that hold downloaded data from Server (in this case it's a mock json)
  private producers: Array<String> = []
  private beers: Array<Beer> = []

  constructor(public settings: SettingsVariablesService) {
    // Download data from server (in this case we're importing a mock json)
    this.beers = mockData.beers;

    // Finds all producers that show up in list of beers
    this.beers.forEach(beer => {
      if (!this.producers.includes(beer.brewer)) {
        this.producers.push(beer.brewer);
      }
    });
  }

  /**
   * getProducers
   * 
   * Returns producers
   * 
   * @returns Array<String>
   */
  public getProducers(): Array<String> {
    return this.producers;
  }
  
  /**
   * getBeers
   * 
   * Returns All beers
   * 
   * @returns Array<Beer>
   */
  public getBeers(): Array<Beer> {
    return this.beers;
  }

  /**
   * getBeersMadeByProducer
   * 
   * Returns all beers made by specific producer
   * 
   * @returns Array<Beer>
   */
  public getBeersMadeByProducer(producer: String): Array<Beer> {
    return this.beers.filter(
      (beer) => {
        if (beer.brewer == producer) {
          return true
        }

        return false
      }
    );
  }

  /**
   * getBeersByProducers([p1, p2, p3])
   * 
   * returns array of beers like below
   * 
   * [
   *    p1beer, p2beer, p3beer,
   *    p1beer, p2beer, p3beer,
   *    ...
   *    p1beer, p2beer, p3beer
   * ]
   * 
   * It caches previous parameters in previous_producers
   * and previous_beers, to optimize for multiple calls at
   * once. It returns instantly if it finds that current call
   * the same as previous one, otherwise creates a new list 
   * that contains sorted lists by producer.
   * 
   * JSON.stringify is used due to it being the fastest and
   * simplest method of comparing arrays
   * 
   * @returns Array<Array<Beer | undefined>>
   */
  public getBeersByProducers(producers: Array<String>): Array<Array<Beer | undefined>> {
    if (JSON.stringify(producers) === JSON.stringify(this.previous_producers)) {
      return this.previous_beers
    }

    let toReturn: Array<Array<Beer | undefined>> = []

    let beers: Array<Array<Beer>>= [
      this.getBeersMadeByProducer(producers[0]),
      this.getBeersMadeByProducer(producers[1]),
      this.getBeersMadeByProducer(producers[2])
    ]
    
    let length = Math.max(beers[0].length, beers[1].length, beers[2].length);

    for (let i = 0; i < length; i++) {
      toReturn.push([beers[0][i], beers[1][i], beers[2][i]])
    }

    this.previous_producers = producers;
    this.previous_beers = toReturn;
    return toReturn;
  }

  /**
   * getBeersFiltered([p1, p2, p3], [l1, l2, l3])
   * 
   * Returns getBeersByProducers but filtered by current amount
   * intended on screen
   * 
   * JSON.stringify is used due to it being the fastest and
   * simplest method of comparing arrays
   * 
   * @returns Array<Array<Beer | undefined>>
   */
  public getBeersFiltered(producers: Array<String>, limits: Array<Number>): Array<Array<Beer | undefined>> {
    // console.log(limits, this.previous_limits, limits == this.previous_limits)
    if (JSON.stringify(producers) === JSON.stringify(this.previous_producers) && JSON.stringify(limits) === JSON.stringify(this.previous_limits) && this.previous_filter == this.settings.getCurrentTypeFilter()) {
      return this.previous_beers_filtered
    }
    this.limits_override = [0, 0, 0]

    // Map is used to remove all objects that are more than current limit
    // Filter is used to remove all instanced of empty rows
    let toReturn = this.getBeersByProducers(producers)
      .map((beer, i) => {
          let beerItem: Array<Beer | undefined> = []

          for (let j = 0; j < 3; j++) {
            if (i < limits[j]) {
              beerItem.push(beer[j])
            }
            else {
              if (beer[j] != undefined) {
                this.limits_override[j] += 1
              }
              beerItem.push(undefined)
            }
          }

          return beerItem
      })
      .filter(
        (item) => {
          return JSON.stringify(item) != JSON.stringify([undefined, undefined, undefined])
        }
      );
    
    toReturn = this.sortItems(toReturn)

    this.previous_limits = limits
    this.previous_producers = producers
    this.previous_filter = this.settings.getCurrentTypeFilter()
    this.previous_beers_filtered = toReturn

    return toReturn
  }

  /**
   * getLimitsOverride()
   * 
   * Returns amount of left items that user can load
   * 
   * @returns Array<number>
   */
  public getLimitsOverride(): Array<number> {
    return this.limits_override
  }

  /**
   * sortItems()
   * 
   * @returns Array<Array<Beer | undefined>> 
   */
  public sortItems(toReturn: Array<Array<Beer | undefined>>): Array<Array<Beer | undefined>> {
    let collumns: Array<Array<Beer | undefined>> = [[], [], []]

    for (let i = 0; i < toReturn.length; i++) {
      collumns[0].push(toReturn[i][0]);
      collumns[1].push(toReturn[i][1]);
      collumns[2].push(toReturn[i][2]);
    }

    if (this.settings.getCurrentTypeFilter() === "Name") {
      for (let i = 0; i < 3; i++) {
        collumns[i].sort((a, b) => {
          // Fix for error TS2533:
          // 
          // Object is possibly 'null' or 'undefined'
          let x: String = a!.name
          let y: String = b!.name

          if(x < y) { return -1; }
          if(x > y) { return 1; }
          return 0;
        })
      }
    }
    else if (this.settings.getCurrentTypeFilter() === "Price") {
      for (let i = 0; i < 3; i++) {
        collumns[i].sort((a, b) => {
          // Fix for error TS2533:
          // 
          // Object is possibly 'null' or 'undefined'
          let x: Number = a!.price_per_litre
          let y: Number = b!.price_per_litre
          
          if (a == undefined && b == undefined) {
            return 0
          }
          else if (a == undefined) {
            return Number(-y)
          }
          else if (b == undefined) {
            return Number(x)
          } 
          else {
            return Number(x.valueOf() - y.valueOf())
          }
        })
      }
    }
    else if (this.settings.getCurrentTypeFilter() === "Type") {
      for (let i = 0; i < 3; i++) {
        collumns[i].sort((a, b) => {
          // Fix for error TS2533:
          // 
          // Object is possibly 'null' or 'undefined'
          let x: String = a!.type
          let y: String = b!.type

          if(x < y) { return -1; }
          if(x > y) { return 1; }
          return 0;
        })
      }
    }

    for (let i = 0; i < toReturn.length; i++) {
      collumns[0].push(toReturn[i][0]);
      collumns[1].push(toReturn[i][1]);
      collumns[2].push(toReturn[i][2]);
    }

    toReturn = [];
    
    for (let i = 0; i < Math.floor(Math.max(collumns[0].length, collumns[1].length, collumns[2].length) / 2); i++) {
      toReturn.push([collumns[0][i], collumns[1][i], collumns[2][i]])
    }

    return toReturn
  }
}
