import { NgModule } from '@angular/core';

import { AutenticarService } from '../1-autenticar/autenticar.service';
import { CaixaDialogoService } from '../5-componentes/caixa-dialogo/caixa-dialogo.service';
import { InterfaceService } from './interface.service';

import { CompartilhadoModule } from '../compartilhado.module';
import { ConfiguracoesModule } from '../3-interface/configuracoes/configuracoes.module';
import { MenuModule } from '../3-interface/menu/menu.module';
import { ModuloModule } from '../3-interface/modulo/modulo.module';

import { ValidarComponent } from './../5-componentes/formulario/validar/validar.component';
import { InterfaceComponent } from './interface.component';
import { DesktopModule } from './desktop/desktop.module';

@NgModule({
  imports: [
    CompartilhadoModule,
    ConfiguracoesModule,
    MenuModule,
    ModuloModule,
    DesktopModule
  ],
  declarations: [
    InterfaceComponent,
    ValidarComponent
  ],
  exports: [
    InterfaceComponent,
    ValidarComponent
  ],

  providers: [AutenticarService, InterfaceService, CaixaDialogoService],
})
export class InterfaceModule { }
