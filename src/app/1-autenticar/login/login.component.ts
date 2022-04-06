import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModeloCampos } from 'src/app/2-dados/interface';
import { AutenticarService } from '../autenticar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  exibir: boolean = true;

  @Input() modelo: ModeloCampos;

  constructor(
    public autenticar: AutenticarService,
    public router: Router
  ) { }

  ngOnInit(): void {


  }

  onSubmit() {
    this.autenticar.logar();
  }
  cadastro() {
    this.router.navigate(['cadastrar'])
  }
  recuperaSenha() {
    this.router.navigate(['recuperar-senha'])
  }

}
