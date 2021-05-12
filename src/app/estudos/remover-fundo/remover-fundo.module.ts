import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoverFundoComponent } from './remover-fundo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RemoverFundoComponent],
  exports:[RemoverFundoComponent]
})
export class RemoverFundoModule { }
