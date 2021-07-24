import { NgModule } from '@angular/core';
import { CompartilhadoModule } from 'src/app/compartilhado.module';
import { BarraItemComponent } from './barra-item.component';


@NgModule({
  imports: [
    CompartilhadoModule
  ],
  exports:[BarraItemComponent],
  declarations: [BarraItemComponent]
})
export class BarraItemModule { }
