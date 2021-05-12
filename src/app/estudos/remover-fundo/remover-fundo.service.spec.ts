/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { RemoverFundoService } from './remover-fundo.service';

describe('Service: RemoverFundo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoverFundoService]
    });
  });

  it('should ...', inject([RemoverFundoService], (service: RemoverFundoService) => {
    expect(service).toBeTruthy();
  }));
});
