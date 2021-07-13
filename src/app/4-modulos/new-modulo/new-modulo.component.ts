import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChaveModulo, Revenda } from 'src/app/2-dados/interface';

import { InterfaceService } from 'src/app/3-interface/interface.service';
import { Debug } from 'src/app/5-componentes/debug';

@Component({
  selector: 'app-new-modulo',
  templateUrl: './new-modulo.component.html',
  styleUrls: ['./new-modulo.component.scss']
})
export class NewModuloComponent implements OnInit {

  carregar = false;
  chaveModulo: ChaveModulo = 'newModulo';
  dados: Revenda = null;
  formulario: FormGroup = null;

  constructor(
    public i: InterfaceService,
    public router: ActivatedRoute,
/*     public caixaDialogo: CaixaDialogoService,
    public firebase: AngularFirestore,
    public http: HttpClient */
  ) {
    this.router.params.subscribe( o => this.start());
  }

  ngOnInit() {

  }
  async start() {
    try {
      await this.i.startModulo(this.router.snapshot);
      this.formulario = this.i.data.usuario.modulo.newModulo.form;
      this.carregar = true;

    } catch (error) { }

  }

}

