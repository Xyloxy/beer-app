import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsVariablesService {

  // All Values for Settings
  private amount_to_load: Array<number> = [15, 30, 45]
  private type_filter: Array<String> = ["Name", "Price", "Type"]

  constructor() { }

  /**
   * amountToLoad
   * 
   * Returns all predefined amounts by which you can load items
   */
  public getAmountToLoad(): Array<number> {
    return this.amount_to_load
  }

  /**
   * getTypes
   * 
   * Returns all types with which objects can be filtered
   */
  public getTypes(): Array<String> {
    return this.type_filter
  }
}
