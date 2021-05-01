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

  it('Amount to load should be correct', () => {
    expect(service.getAmountToLoad()).toEqual([15, 30, 45]);
  });

  it('Current amount to load should be correct', () => {
    expect(service.getCurrentAmountToLoad()).toEqual(15);
  });

  it('Type filter should be correct', () => {
    expect(service.getTypes()).toEqual(["Name", "Price", "Type"]);
  });

  it('Current type filter should be correct', () => {
    expect(service.getCurrentTypeFilter()).toEqual("Name");
  });
});
