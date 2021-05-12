import { Component, OnInit } from '@angular/core';
import { Animacoes } from 'src/app/3-interface/animacao';
import { InterfaceService } from 'src/app/3-interface/interface.service';

@Component({
  selector: 'app-menu-topo',
  templateUrl: './menu-topo.component.html',
  styleUrls: ['./menu-topo.component.scss'],
  animations: [Animacoes]
})
export class MenuTopoComponent implements OnInit {


  constructor( public i: InterfaceService ) { }

  ngOnInit() {

  }

}
