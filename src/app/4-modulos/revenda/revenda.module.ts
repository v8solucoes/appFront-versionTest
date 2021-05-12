import { NgModule } from '@angular/core';

import { CompartilhadoModule } from 'src/app/compartilhado.module';

import { RevendaRoutes } from './revenda.routing';

import { FormularioModule } from 'src/app/5-componentes/formulario/formulario.module';
import { RevendaComponent } from './revenda.component';

@NgModule({

  imports: [
    RevendaRoutes,
    CompartilhadoModule,
    FormularioModule,
  ],
  declarations: [
    RevendaComponent,
  ],
  exports: [
    RevendaComponent,
]
})
export class RevendaModule { }
