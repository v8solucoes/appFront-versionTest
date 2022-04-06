import { ModeloCampos } from 'src/app/2-dados/interface';
import { Component, Input, OnInit } from '@angular/core';
import { AutenticarService } from '../autenticar.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {

  @Input() modelo: ModeloCampos;

  constructor(
    public autenticar: AutenticarService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.autenticar.resetarSenha();
  }

}
