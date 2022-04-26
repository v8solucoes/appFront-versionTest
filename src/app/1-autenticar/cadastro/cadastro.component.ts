import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ModeloCampos } from 'src/app/2-dados/interface';
import { AutenticarService } from '../autenticar.service';
import { Nome_Dados } from '../../../../../construtor/src/construtor/dados/dados.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  exibir: boolean = true;

  @Input() modelo: ModeloCampos;

  public tipo: Nome_Dados['tipoAcesso']

  constructor(
    public autenticar: AutenticarService,
    private route: Router,
    private routerAtivo: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.routerAtivo.params.subscribe(params => {

      this.tipo = params['tipo']

    })
  }

  onSubmit() {
    this.autenticar.autenticar(this.tipo);
  }

  voltarLogin() {
    this.route.navigate(['login']);
  }

}
