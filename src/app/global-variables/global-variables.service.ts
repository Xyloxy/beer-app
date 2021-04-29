import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  private current_color: string = "secondary"

  public amount_filter: Array<number> = [15, 30, 45, 60]
  public producer_filter: Array<any> = ["Firm1", "Firm2"]

  constructor() {
  }

  /**
   * swapColor()
   * 
   * Swaps color from Dark to Light mode
   */
  public swapColor(): void {
    if (this.current_color == "secondary") {
      this.current_color = "primary";
    }
    else {
      this.current_color = "secondary"
    }
  }

  /**
   * isDarkMode()
   * 
   * Returns answer to question: "Is current color mode dark"
   */
  public isDarkMode(): boolean {
    if (this.current_color == "primary") {
      return false;
    }
    
    return true;
  }
  
  /**
   * getColorMode()
   * 
   * Returns current color mode
   */
   public getColorMode(): string {
    return this.current_color;
  }
}
