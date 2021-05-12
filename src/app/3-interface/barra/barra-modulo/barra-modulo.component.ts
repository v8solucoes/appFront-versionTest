import { Component, OnInit } from '@angular/core';
import { Animacoes } from '../../animacao';
import { InterfaceService } from '../../interface.service';

@Component({
  selector: 'app-barra-modulo',
  templateUrl: './barra-modulo.component.html',
  styleUrls: ['./barra-modulo.component.scss'],
  animations: [ Animacoes]
})
export class BarraModuloComponent implements OnInit {

  constructor(
    public i: InterfaceService
  ) { }

  ngOnInit() {
  }

}
