import { Component, Input, OnInit } from '@angular/core';
import { ModeloCampos } from '../2-dados/interface';
import { AutenticarService } from './autenticar.service';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.scss']
})
export class AutenticarComponent implements OnInit {

  exibir: boolean = true;
  cadastrarUsuario: boolean = false;
  novaSenha: boolean = false;
  @Input() modelo: ModeloCampos;


  constructor(
    public autenticar: AutenticarService,
  ) {
    console.log('Autenticar Component');
  }

  ngOnInit() {

  }

  cadastrar() {
    this.cadastrarUsuario = !this.cadastrarUsuario;
  }

  senhaNova() {
    this.novaSenha = !this.novaSenha;
  }

}
