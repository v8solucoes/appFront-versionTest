import { NgModule } from '@angular/core';
import { CompartilhadoModule } from 'src/app/compartilhado.module';

import { BarraCriaComponent } from './barra-cria.component';

@NgModule({
  imports: [
    CompartilhadoModule
  ],
  exports:[BarraCriaComponent],
  declarations: [BarraCriaComponent]
})
export class BarraCriaModule { }
