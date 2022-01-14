import { ChaveModulo, Revenda } from './../../interfaces-import';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InterfaceService } from 'src/app/3-interface/interface.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-revenda',
  templateUrl: './revenda.component.html',
  styleUrls: ['./revenda.component.scss'],

})
export class RevendaComponent implements OnInit {

  carregar = false;
  chaveModulo: ChaveModulo = 'revenda';
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
      this.formulario = this.i.data.usuario.modulo.revenda.form;
      this.carregar = true;
      console.log(this.formulario)

    } catch (error) { }

  }
}
