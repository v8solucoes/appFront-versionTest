import { NgModule } from '@angular/core';

import { CompartilhadoModule } from '../compartilhado.module';
import { AutenticarComponent } from './autenticar.component';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';

@NgModule({
  imports: [
    CompartilhadoModule,
    CoolSocialLoginButtonsModule,

  ],
  declarations: [
    AutenticarComponent,
    LoginComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
  ],
  exports: [
    AutenticarComponent
  ]
})
export class AutenticarModule { }
