import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Animacoes } from '../../../animacao';
import { InterfaceService } from '../../../interface.service';

@Component({
  selector: 'app-barra-celular-topo',
  templateUrl: './barra-celular-topo.component.html',
  styleUrls: ['./barra-celular-topo.component.scss'],
  animations: [ Animacoes]
})
export class BarraCelularTopoComponent implements OnInit {

  credenciais = this.i.data.usuario?.credenciais;

  links = ['Recentes', 'Relatório'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  barraNavegar = true;

  constructor(
    public i: InterfaceService,
  ) { }
  ngOnInit() {

  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
}
