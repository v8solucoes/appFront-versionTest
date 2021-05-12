import { NgModule } from '@angular/core';

import { CompartilhadoModule } from 'src/app/compartilhado.module';

import { BarraDesktopModule } from './../barra/barra-desktop/barra-desktop.module';
import { DesktopComponent } from './desktop.component';

@NgModule({
  imports: [
    CompartilhadoModule,
    BarraDesktopModule

  ],
  declarations: [
    DesktopComponent,
  ],
  exports: [
    DesktopComponent,
  ]
})
export class DesktopModule { }
