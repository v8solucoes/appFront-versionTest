import { NgModule } from '@angular/core';

import { CompartilhadoModule } from '../../compartilhado.module';

import { NewModuloRoutes } from './new-modulo.routing';

import { NewModuloComponent } from './new-modulo.component';
import { FormularioModule } from 'src/app/5-componentes/formulario/formulario.module';


@NgModule({
  imports: [
    NewModuloRoutes,
    CompartilhadoModule,
    FormularioModule
  ],
  declarations: [
    NewModuloComponent
  ],
  exports: [
    NewModuloComponent
  ],

})
export class NewModuloModule { }
