import { Component, OnInit } from '@angular/core';
import { ServicoCredenciaisAcao } from '../../../../../../../interface/servicoCredenciais';
import { InterfaceService } from '../../../interface.service';

@Component({
  selector: 'app-barra-lista',
  templateUrl: './barra-lista.component.html',
  styleUrls: ['./barra-lista.component.scss']
})
export class BarraListaComponent implements OnInit {

  constructor(
    public i: InterfaceService,
  ) { }

  acao: ServicoCredenciaisAcao = 'itemNovo'
  
  ngOnInit() {

  }

}
