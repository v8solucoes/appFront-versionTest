import { AnimacoesComponente } from './../../animacoes/animacaoRouter';
import { Component, OnInit } from '@angular/core';
import { Animacoes } from '../../animacao';
import { InterfaceService } from '../../interface.service';

@Component({
  selector: 'app-barra-desktop',
  templateUrl: './barra-desktop.component.html',
  styleUrls: ['./barra-desktop.component.scss'],
  animations: [ Animacoes, AnimacoesComponente]
})
export class BarraDesktopComponent implements OnInit {

  constructor(
    public i: InterfaceService
  ) { }

  ngOnInit() {


  }

}
