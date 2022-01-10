import { Component, Input, OnInit } from '@angular/core';
import { ChaveModulo } from 'src/app/2-dados/interface';
import { InterfaceService } from 'src/app/3-interface/interface.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  @Input() modulo: ChaveModulo;
  @Input() debugar: boolean;

  usuario = this.i.data.usuario;


  constructor(
    public i: InterfaceService

  ) {


  }

  ngOnInit() {

  }

}
