import { NgModule } from '@angular/core';
import { CompartilhadoModule } from 'src/app/compartilhado.module';
import { ListarComponent } from './listar.component';


@NgModule({
  imports: [
    CompartilhadoModule
  ],
  exports: [ListarComponent],
  declarations: [ListarComponent]
})
export class ListarModule { }
