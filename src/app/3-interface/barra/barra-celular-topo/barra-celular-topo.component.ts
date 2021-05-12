import { Component, OnInit } from '@angular/core';
import { Animacoes } from '../../animacao';
import { InterfaceService } from '../../interface.service';

@Component({
  selector: 'app-barra-celular-topo',
  templateUrl: './barra-celular-topo.component.html',
  styleUrls: ['./barra-celular-topo.component.scss'],
  animations: [ Animacoes]
})
export class BarraCelularTopoComponent implements OnInit {

  constructor(
    public i: InterfaceService
  ) { }
  ngOnInit() {

  }
}
