import { TestBed } from '@angular/core/testing';

import { ColorVariablesService } from './color-variables.service';

describe('ColorVariablesService', () => {
  let service: ColorVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
