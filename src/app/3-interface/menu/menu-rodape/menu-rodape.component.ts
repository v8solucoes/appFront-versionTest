import { CaixaDialogoService } from '../../../5-componentes/caixa-dialogo/caixa-dialogo.service';
import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../../3-interface/interface.service';
import { AutenticarService } from 'src/app/1-autenticar/autenticar.service';
import { Animacoes } from 'src/app/3-interface/animacao';

@Component({
  selector: 'app-menu-rodape',
  templateUrl: './menu-rodape.component.html',
  styleUrls: ['./menu-rodape.component.scss'],
  animations: [ Animacoes]
})
export class MenuRodapeComponent implements OnInit {

  constructor(
    public a: AutenticarService,
    public caixaDialogo: CaixaDialogoService,
    public i: InterfaceService,
  ) { }

  ngOnInit() {
  }

}
