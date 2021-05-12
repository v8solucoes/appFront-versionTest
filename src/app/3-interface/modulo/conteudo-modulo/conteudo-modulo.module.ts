import { ListarModule } from 'src/app/5-componentes/listar/listar.module';
import { CompartilhadoModule } from './../../../compartilhado.module';
import { NgModule } from '@angular/core';

import { ConteudoModuloComponent } from './conteudo-modulo.component';

@NgModule({
  imports: [
    CompartilhadoModule,
    ListarModule
  ],
  declarations: [ConteudoModuloComponent],
  exports: [ConteudoModuloComponent]
})
export class ConteudoModuloModule { }
