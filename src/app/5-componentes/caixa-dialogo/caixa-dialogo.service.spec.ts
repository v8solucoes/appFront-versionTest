/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { CaixaDialogoService } from './caixa-dialogo.service';

describe('Service: CaixaDialogo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaixaDialogoService]
    });
  });

  it('should ...', inject([CaixaDialogoService], (service: CaixaDialogoService) => {
    expect(service).toBeTruthy();
  }));
});
