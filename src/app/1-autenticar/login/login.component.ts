import { Component, Input, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {


  }

  onSubmit() {
    this.autenticar.logar();
  }

}
