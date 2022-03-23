import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormularioModule } from 'src/app/5-componentes/formulario/formulario.module';
import { CompartilhadoModule } from 'src/app/compartilhado.module';
import { ApresentadorComponent } from './apresentador.component';
import { VisualizarComponent } from './gerar-codigo/visualizar/visualizar.component';
import { GerarCodigoComponent } from './gerar-codigo/gerar-codigo.component';

@NgModule({
  imports: [
    CompartilhadoModule,
    FormularioModule,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    ApresentadorComponent,
    VisualizarComponent,
    GerarCodigoComponent,
  ],
  exports: [
    ApresentadorComponent,
    VisualizarComponent
  ]
})
export class ApresentadorModule { }
