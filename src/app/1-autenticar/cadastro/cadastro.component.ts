import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ModeloCampos } from 'src/app/2-dados/interface';
import { AutenticarService } from '../autenticar.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  exibir: boolean = true;

  @Input() modelo: ModeloCampos;

  constructor(
    public autenticar: AutenticarService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.autenticar.cadastrar();
  }

  voltarLogin() {
    this.route.navigate(['login']);
  }

}
