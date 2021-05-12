import { NgModule } from '@angular/core';
import { CompartilhadoModule } from 'src/app/compartilhado.module';

import { FormularioComponent } from './formulario.component';
import { GrupoComponent } from 'src/app/5-componentes/formulario/grupo/grupo.component';
import { InputComponent } from 'src/app/5-componentes/formulario/input/input.component';
import { InputErroComponent } from 'src/app/5-componentes/formulario/input/input-erro/input-erro.component';
import { ListaComponent } from 'src/app/5-componentes/formulario/lista/lista.component';
import { GaleriaHorizontalComponent } from './input/galeria-horizontal/galeria-horizontal.component';

@NgModule({
  imports: [
    CompartilhadoModule
  ],

  exports: [
    FormularioComponent,
    GrupoComponent,
    ListaComponent,
    InputComponent,
    InputErroComponent,
    GaleriaHorizontalComponent
  ],
  declarations: [
    FormularioComponent,
    GrupoComponent,
    ListaComponent,
    InputComponent,
    InputErroComponent,
    GaleriaHorizontalComponent
  ],
  providers: [ ]
})
export class FormularioModule { }
