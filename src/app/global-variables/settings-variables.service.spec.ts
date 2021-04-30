import { TestBed } from '@angular/core/testing';

import { SettingsVariablesService } from './settings-variables.service';

describe('SettingsVariablesService', () => {
  let service: SettingsVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
