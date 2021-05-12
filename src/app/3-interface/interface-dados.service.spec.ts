/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InterfaceDadosService } from './interface-dados.service';

describe('Service: InterfaceDados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterfaceDadosService]
    });
  });

  it('should ...', inject([InterfaceDadosService], (service: InterfaceDadosService) => {
    expect(service).toBeTruthy();
  }));
});
