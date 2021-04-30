import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorVariablesService {

  // Contains currect theme of the website ("primary" / "secondary")
  private current_color: string = "primary" //"secondary"

  constructor() { }

  /**
   * swapColor()
   * 
   * Swaps color from Dark to Light mode ("primary" / "secondary")
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
   * Returns current_color value
   */
  public getColorMode(): string {
    return this.current_color;
  }


  /**
   * getColorClass()
   * 
   * Returns class names for color change
   */
   public getColorClass(): string {
    if (this.current_color == "primary") {
      return "white_mode"
    }
    return ""
  }
}
