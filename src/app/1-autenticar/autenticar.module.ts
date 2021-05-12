import { NgModule } from '@angular/core';

import { CompartilhadoModule } from '../compartilhado.module';
import { AutenticarComponent } from './autenticar.component';

@NgModule({
  imports: [
    CompartilhadoModule,
  ],
  declarations: [
    AutenticarComponent
  ],
  exports: [
    AutenticarComponent
  ]
})
export class AutenticarModule { }
