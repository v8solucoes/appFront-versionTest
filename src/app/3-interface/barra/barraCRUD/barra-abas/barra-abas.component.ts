import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Animacoes } from '../../../animacao';
import { InterfaceService } from '../../../interface.service';

@Component({
  selector: 'app-barra-abas',
  templateUrl: './barra-abas.component.html',
  styleUrls: ['./barra-abas.component.scss'],
  animations: [ Animacoes]
})
export class BarraAbasComponent implements OnInit {

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
