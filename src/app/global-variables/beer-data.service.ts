import { Injectable } from '@angular/core';
import { Beer } from '../interfaces/beer';
import mockData from '../../assets/mockData.json';

@Injectable({
  providedIn: 'root'
})
export class BeerDataService {

  // Values to optimize Angular calls for getBeersByProducers
  // If they weren't used the code would execute 10x in a row
  // which makes no sense to do
  private previous_producers: Array<String> = []
  private previous_beers: Array<Array<Beer | undefined>> = []

  // Values that hold downloaded data from Server (in this case it's a mock json)
  private producers: Array<String> = []
  private beers: Array<Beer> = []

  constructor() {
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
   */
  public getProducers(): Array<String> {
    return this.producers;
  }
  
  /**
   * getBeers
   * 
   * Returns All beers
   */
  public getBeers(): Array<Beer> {
    return this.beers;
  }

  /**
   * getBeers
   * 
   * Returns all beers made by specific producer
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
}
