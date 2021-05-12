import { NgModule } from '@angular/core';
import { CompartilhadoModule } from 'src/app/compartilhado.module';

import { ModuloComponent } from './modulo.component';

import { BarraCelularTopoModule } from '../barra/barra-celular-topo/barra-celular-topo.module';
import { ConteudoModuloModule } from './conteudo-modulo/conteudo-modulo.module';
import { ConteudoCelularModule } from './conteudo-celular/conteudo-celular.module';
import { BarraModuloModule } from '../barra/barra-modulo/barra-modulo.module';

@NgModule({
  imports: [
    CompartilhadoModule,
    BarraCelularTopoModule,
    BarraModuloModule,
    ConteudoCelularModule,
    ConteudoModuloModule
  ],
  declarations: [
    ModuloComponent

  ],
   exports: [
    ModuloComponent
  ],
})
export class ModuloModule { }
