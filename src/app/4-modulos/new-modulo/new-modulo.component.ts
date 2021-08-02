import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChaveModulo } from 'src/app/2-dados/interface';

import { InterfaceService } from 'src/app/3-interface/interface.service';
import { DadosNewModulo } from './dados-new-modulo';

@Component({
  selector: 'app-new-modulo',
  templateUrl: './new-modulo.component.html',
  styleUrls: ['./new-modulo.component.scss'],
})
export class NewModuloComponent implements OnInit {
  carregar = false;
  chaveModulo: ChaveModulo = 'newModulo';
  dados: DadosNewModulo = null;
  formulario: FormGroup = null;

  constructor(public i: InterfaceService, public router: ActivatedRoute) {
    this.router.params.subscribe((o) => this.start());
  }

  ngOnInit() {}
  async start() {
    try {
      await this.i.startModulo(this.router.snapshot);
      this.formulario = this.i.data.usuario.modulo.newModulo.form;
      this.carregar = true;
    } catch (error) {}
  }
}
