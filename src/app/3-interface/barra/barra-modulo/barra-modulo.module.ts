import { NgModule } from '@angular/core';
import { BarraAbasModule } from '../barraCRUD/barra-abas/barra-abas.module';
import { BarraCriaModule } from '../barraCRUD/barra-cria/barra-cria.module';
import { BarraItemModule } from '../barraCRUD/barra-item/barra-item.module';
import { BarraListaModule } from '../barraCRUD/barra-lista/barra-lista.module';

import { CompartilhadoModule } from './../../../compartilhado.module';
import { BarraModuloComponent } from './barra-modulo.component';

@NgModule({
  imports: [
    CompartilhadoModule,
    BarraCriaModule,
    BarraItemModule,
    BarraListaModule,
    BarraAbasModule
  ],
  declarations: [BarraModuloComponent],
  exports: [BarraModuloComponent]
})
export class BarraModuloModule { }
