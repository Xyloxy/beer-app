import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorVariablesService {

  // Contains currect theme of the website ("primary" / "secondary")
  private current_color: string = "secondary"

  constructor() { }

  /**
   * swapColor()
   * 
   * Swaps color from Dark to Light mode ("primary" / "secondary")
   * 
   * @returns void
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
   * 
   * @returns boolean
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
   * Returns current_color value
   * 
   * @returns string
   */
  public getColorMode(): string {
    return this.current_color;
  }


  /**
   * getColorClass()
   * 
   * Returns class names for color change
   * 
   * @returns string
   */
  public getColorClass(): string {
    if (this.current_color == "primary") {
      return "white_mode"
    }
    return ""
  }
}
