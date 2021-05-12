import { BarraAbasModule } from '../barra-abas/barra-abas.module';
import { NgModule } from '@angular/core';

import { CompartilhadoModule } from 'src/app/compartilhado.module';
import { BarraListaComponent } from './barra-lista.component';

@NgModule({
  imports: [
    CompartilhadoModule,
    BarraAbasModule
  ],
  exports:[BarraListaComponent],
  declarations: [BarraListaComponent]
})
export class BarraListaModule { }
