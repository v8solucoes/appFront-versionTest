import { NgModule } from '@angular/core';

import { CompartilhadoModule } from '../../compartilhado.module';
import { UrlParaModuloPipe } from '../../5-componentes/pipe/url-para-modulo.pipe';
import { UrlModuloPipe } from '../../5-componentes/pipe/url-modulo.pipe';

import { MenuComponent } from './menu.component';
import { MenuTopoComponent } from './menu-topo/menu-topo.component';
import { MenuListaComponent } from './menu-lista/menu-lista.component';
import { MenuRodapeComponent } from './menu-rodape/menu-rodape.component';

@NgModule({
  imports: [
    CompartilhadoModule,
  ],
  exports: [
    MenuComponent,
    MenuTopoComponent,
    MenuListaComponent,
    MenuRodapeComponent
  ],
  declarations: [
   MenuComponent,
   MenuTopoComponent,
   MenuListaComponent,
   MenuRodapeComponent,
   UrlModuloPipe,
   UrlParaModuloPipe
  ]
})
export class MenuModule { }
