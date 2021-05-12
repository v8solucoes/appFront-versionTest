import { NgModule } from '@angular/core';
import { ListarModule } from 'src/app/5-componentes/listar/listar.module';

import { CompartilhadoModule } from './../../../compartilhado.module';
import { ConteudoCelularComponent } from './conteudo-celular.component';

@NgModule({
  imports: [
    CompartilhadoModule,
    ListarModule
  ],
  declarations: [ConteudoCelularComponent],
  exports: [ConteudoCelularComponent],
})
export class ConteudoCelularModule { }
