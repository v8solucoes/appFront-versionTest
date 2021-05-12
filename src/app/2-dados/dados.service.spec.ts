/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { DadosService } from './dados.service';

describe('Service: Dados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadosService]
    });
  });

  it('should ...', inject([DadosService], (service: DadosService) => {
    expect(service).toBeTruthy();
  }));
});
