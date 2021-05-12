import { Usuario, Modulo } from './../../2-dados/interface';
import { InterfaceService } from 'src/app/3-interface/interface.service';
import { Component, Input, OnInit } from '@angular/core';
import { Animacoes } from 'src/app/3-interface/animacao';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  animations: [Animacoes]
})
export class ListarComponent implements OnInit {

  @Input() lista: any;
  modulo: Modulo = this.i.data.usuario.modulo;

  constructor(
   public i: InterfaceService
  ) { }

  ngOnInit() {
  }

}
