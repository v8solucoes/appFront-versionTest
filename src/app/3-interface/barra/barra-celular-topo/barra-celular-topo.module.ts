import { BarraAbasModule } from '../barraCRUD/barra-abas/barra-abas.module';
import { NgModule } from '@angular/core';
import { CompartilhadoModule } from './../../../compartilhado.module';

import { BarraCriaModule } from '../barraCRUD/barra-cria/barra-cria.module';
import { BarraItemModule } from '../barraCRUD/barra-item/barra-item.module';
import { BarraListaModule } from '../barraCRUD/barra-lista/barra-lista.module';
import { BarraCelularTopoComponent } from './barra-celular-topo.component';

@NgModule({
  imports: [
    CompartilhadoModule,
    BarraCriaModule,
    BarraItemModule,
    BarraListaModule,
    BarraAbasModule
  ],
  exports:[
    BarraCelularTopoComponent
  ],
  declarations: [BarraCelularTopoComponent]
})
export class BarraCelularTopoModule { }
