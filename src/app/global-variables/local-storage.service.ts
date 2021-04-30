import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * saveOptions()
   * 
   * saves data to localStorage
   * 
   * @returns void
   */
  public saveOptions(name: string, data: any): void {
    localStorage.setItem(name, JSON.stringify(data))
  }
  
  /**
   * loadOptions()
   * 
   * loads data from localStorage
   * 
   * @returns object
   */
  public loadOptions(name: string): Object {
    return JSON.parse(localStorage.getItem(name)!)
  }
}
