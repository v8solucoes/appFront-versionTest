import { NgModule } from '@angular/core';
import { CompartilhadoModule } from 'src/app/compartilhado.module';

import { BarraAbasModule } from '../barraCRUD/barra-abas/barra-abas.module';
import { BarraCriaModule } from '../barraCRUD/barra-cria/barra-cria.module';
import { BarraItemModule } from '../barraCRUD/barra-item/barra-item.module';
import { BarraListaModule } from '../barraCRUD/barra-lista/barra-lista.module';
import { BarraDesktopComponent } from './barra-desktop.component';


@NgModule({
  imports: [
    CompartilhadoModule,
    BarraCriaModule,
    BarraItemModule,
    BarraListaModule,
    BarraAbasModule
  ],
  exports:[
    BarraDesktopComponent
  ],
  declarations: [BarraDesktopComponent]
})
export class BarraDesktopModule { }
