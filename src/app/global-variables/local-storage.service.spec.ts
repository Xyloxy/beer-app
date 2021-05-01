import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and load data correctly', () => {
    let key = "key"
    let data = {"random_key": "random string"}
    service.saveOptions(key, data)
    expect(JSON.stringify(data) == JSON.stringify(service.loadOptions(key))).toBeTrue();
  });
});
