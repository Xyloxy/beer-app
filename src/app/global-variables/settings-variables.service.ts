import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsVariablesService {

  // All Values for Settings
  private amount_to_load: Array<number> = [15, 30, 45]
  private current_to_load: number = 15
  private type_filter: Array<String> = ["Name", "Price", "Type"]
  private current_type_filter: String = "Name"

  constructor(private local: LocalStorageService) {
    let data: any = this.local.loadOptions("settings")
    if (data != undefined) {
      this.current_to_load = data.amount
    }
  }

  /**
   * amountToLoad()
   * 
   * Returns all predefined amounts by which you can load items
   * 
   * @returns Array<number>
   */
  public getAmountToLoad(): Array<number> {
    return this.amount_to_load
  }

  /**
   * getCurrentAmountToLoad()
   * 
   * Returns current amounts by which you load items
   * 
   * @returns number
   */
   public getCurrentAmountToLoad(): number {
    return this.current_to_load
  }

  /**
   * setCurrentAmountToLoad()
   * 
   * Sets current amounts by which you load items
   * 
   * @returns void
   */
  public setCurrentAmountToLoad(n: number): void {
    this.current_to_load = n
    this.local.saveOptions(
      "settings",
      {
        amount: this.current_to_load,
        filter: this.current_type_filter
      }
    )
  }

  /**
   * getCurrentTypeFilter()
   * 
   * Get current type filter
   * 
   * @returns String
   */
   public getCurrentTypeFilter(): String {
    return this.current_type_filter
  }

  /**
   * setCurrentTypeFilter()
   * 
   * Sets current type filter
   * 
   * @returns void
   */
  public setCurrentTypeFilter(n: String): void {
    this.current_type_filter = n
    this.local.saveOptions(
      "settings",
      {
        amount: this.current_to_load,
        filter: this.current_type_filter
      }
    )
  }

  /**
   * getTypes()
   * 
   * Returns all types with which objects can be filtered
   * 
   * @returns Array<String>
   */
  public getTypes(): Array<String> {
    return this.type_filter
  }
}
