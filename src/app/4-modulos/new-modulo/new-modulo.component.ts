import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InterfaceService } from 'src/app/3-interface/interface.service';
import { Funcoes } from 'src/app/funcoes';
import { Debug } from 'src/app/5-componentes/debug';

@Component({
  selector: 'app-new-modulo',
  templateUrl: './new-modulo.component.html',
  styleUrls: ['./new-modulo.component.scss']
})
export class NewModuloComponent implements OnInit {

  carregar = false;
  modulo = this.i.data.usuario;

  debug = (pro: any, valor: any) => new Debug('ativo', 'New Modulo', pro, valor);

  constructor(
    public router: ActivatedRoute,
    public i: InterfaceService
  ) {
    this.start();
  }

  ngOnInit() { }

  async start() {
    try {
/*
      await this.i.getModulo(Funcoes.gravarUrl(this.router.snapshot));
      this.carregar = true;
      this.debug('START', this.i.data.usuario.modulo.newModulo); */
    } catch (error) {

    }
  }

}

