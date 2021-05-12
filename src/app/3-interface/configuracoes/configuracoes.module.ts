import { NgModule } from '@angular/core';
import { CompartilhadoModule } from '../../compartilhado.module';

import { CaixaDialogoComponent } from '../../5-componentes/caixa-dialogo/caixa-dialogo.component';
import { ConfiguracoesComponent } from './configuracoes.component';
import { FonteTamanhoComponent } from './fonte-tamanho/fonte-tamanho.component';
import { TemaCorComponent } from './tema-cor/tema-cor.component';

@NgModule({
  imports: [
    CompartilhadoModule,
  ],
  exports: [
    CaixaDialogoComponent,
    ConfiguracoesComponent,
    FonteTamanhoComponent,
    TemaCorComponent
  ],
  declarations: [
    ConfiguracoesComponent,
    CaixaDialogoComponent,
    FonteTamanhoComponent,
    TemaCorComponent
  ]
})
export class ConfiguracoesModule { }
