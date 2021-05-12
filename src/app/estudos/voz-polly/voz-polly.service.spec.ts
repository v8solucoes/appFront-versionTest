/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { VozPollyService } from './voz-polly.service';

describe('Service: VozPolly', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VozPollyService]
    });
  });

  it('should ...', inject([VozPollyService], (service: VozPollyService) => {
    expect(service).toBeTruthy();
  }));
});
