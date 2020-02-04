import { TestBed } from '@angular/core/testing';

import { StatemanagementService } from './statemanagement.service';

describe('StatemanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatemanagementService = TestBed.get(StatemanagementService);
    expect(service).toBeTruthy();
  });
});
