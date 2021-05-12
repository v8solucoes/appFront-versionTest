tslint:disable:no-unused-variable

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { InterfaceService } from './interface.service';

describe('Service: Interface', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterfaceService]
    });
  });

  it('should ...', inject([InterfaceService], (service: InterfaceService) => {
    expect(service).toBeTruthy();
  }));
});
