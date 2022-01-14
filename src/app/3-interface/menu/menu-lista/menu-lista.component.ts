import { Component, Input, OnInit } from '@angular/core';
import { InterfaceService } from '../../../3-interface/interface.service';
import { Animacoes } from 'src/app/3-interface/animacao';
import { Menu } from './../../../interfaces-import';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.scss'],
  animations: [Animacoes],

})
export class MenuListaComponent implements OnInit {

  botaoAbrirFecharMenu = false;

  @Input() menu: Menu;
  @Input() primeiro: boolean;
  @Input() ultimo: boolean;
  @Input() divisor: string;
  @Input() penultimo: boolean;

  constructor(
    public i: InterfaceService,
  ) { }

  ngOnInit() { }

}
