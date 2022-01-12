import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormularioModule } from 'src/app/5-componentes/formulario/formulario.module';
import { CompartilhadoModule } from 'src/app/compartilhado.module';
import { ApresentadorComponent } from './apresentador.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { GerarCodigoComponent } from './gerar-codigo/gerar-codigo.component';
import { VisualizarVideoComponent } from './visualizar-video/visualizar-video.component';

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
    VisualizarVideoComponent
  ],
  exports: [
    ApresentadorComponent,
    VisualizarComponent
]
})
export class ApresentadorModule { }
