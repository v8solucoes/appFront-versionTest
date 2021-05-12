/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CriarDadosService } from './criarDados.service';

describe('Service: CriarDados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CriarDadosService]
    });
  });

  it('should ...', inject([CriarDadosService], (service: CriarDadosService) => {
    expect(service).toBeTruthy();
  }));
});
