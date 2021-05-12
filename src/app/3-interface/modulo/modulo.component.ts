import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../3-interface/interface.service';
import { Animacoes } from '../animacao';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss'],
  animations: [ Animacoes]
})
export class ModuloComponent implements OnInit {

  carregar = false;

  constructor(
    public i: InterfaceService,
  ){

  }

  ngOnInit() {
  }

}
