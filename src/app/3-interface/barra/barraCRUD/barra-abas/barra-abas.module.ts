import { NgModule } from '@angular/core';
import { CompartilhadoModule } from 'src/app/compartilhado.module';
import { BarraAbasComponent } from './barra-abas.component';

@NgModule({
  imports: [
    CompartilhadoModule
  ],
  exports:[BarraAbasComponent],
  declarations: [BarraAbasComponent]
})
export class BarraAbasModule { }
