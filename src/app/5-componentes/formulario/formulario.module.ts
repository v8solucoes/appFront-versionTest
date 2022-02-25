import { NgModule } from '@angular/core';
import { CompartilhadoModule } from 'src/app/compartilhado.module';

import { FormularioComponent } from './formulario.component';
import { GrupoComponent } from 'src/app/5-componentes/formulario/grupo/grupo.component';
import { InputComponent } from 'src/app/5-componentes/formulario/input/input.component';
import { InputErroComponent } from 'src/app/5-componentes/formulario/input/input-erro/input-erro.component';
import { ListaComponent } from 'src/app/5-componentes/formulario/lista/lista.component';
import { GaleriaHorizontalComponent } from './input/galeria-horizontal/galeria-horizontal.component';
import { RangeComponent } from './input/range/range.component';
import { RadioComponent } from './input/radio/radio.component';
import { ColorInputComponent } from './input/color-input/color-input.component';
import { ConverterRgbPipe } from './input/converter-rgb.pipe';
import { SlideToggleComponent } from './input/slide-toggle/slide-toggle.component';

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
    GaleriaHorizontalComponent,
    RangeComponent,
    RadioComponent,
    ColorInputComponent,
    ConverterRgbPipe,
    SlideToggleComponent
  ],
  providers: []
})
export class FormularioModule { }
