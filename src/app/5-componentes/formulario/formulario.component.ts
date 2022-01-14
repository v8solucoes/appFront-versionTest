import { Component, Input, OnInit } from '@angular/core';
import { ChaveModulo } from './../../interfaces-import';
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
  permissao = this.i.data.usuario.modulo.apresentador.permissao.filter(campo => {
    if (campo.id == 'vozColecao') return campo;
    if (campo.id == 'idioma') return campo;
    if (campo.id == 'sugestao') return campo;
    if (campo.id == 'texto') return campo;
    if (campo.id == 'api') return campo;
    if (campo.id == 'velocidade') return campo;
    if (campo.id == 'entonacao') return campo;
    if (campo.id == 'tipo') return campo;
    if (campo.id == 'processamento') return campo;
  });


  constructor(
    public i: InterfaceService

  ) {


  }

  ngOnInit() {

  }

}
