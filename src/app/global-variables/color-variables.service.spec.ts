import { TestBed } from '@angular/core/testing';

import { ColorVariablesService } from './color-variables.service';

describe('ColorVariablesService', () => {
  let service: ColorVariablesService;

  // Assuming base color set is dark
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be in dark mode', () => {
    expect(service.isDarkMode()).toBeTrue();
  });

  it('should be in light mode', () => {
    service.swapColorWithoutSaving();
    expect(service.isDarkMode()).not.toBeTrue();
  });

  it('should be in dark color mode', () => {
    expect(service.getColorMode()).toEqual("secondary");
  })

  it('should be in light color mode', () => {
    service.swapColorWithoutSaving()
    expect(service.getColorMode()).toEqual("primary");
  })

  it('should be in dark color class', () => {
    expect(service.getColorClass()).toEqual("");
  })

  it('should be in light color class', () => {
    service.swapColorWithoutSaving()
    expect(service.getColorClass()).toEqual("white_mode");
  })
});
