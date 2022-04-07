import { RecuperarSenhaComponent } from './1-autenticar/recuperar-senha/recuperar-senha.component';
import { CadastroComponent } from './1-autenticar/cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './5-componentes/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AutenticarComponent } from './1-autenticar/autenticar.component';
import { InterfaceComponent } from './3-interface/interface.component';
import { RevendaComponent } from './4-modulos/revenda/revenda.component';
import { ApresentadorComponent } from './4-modulos/apresentador/apresentador.component';
import { VideoGravarComponent } from './estudos/video-gravar/video-gravar.component';
import { StreamVideoComponent } from './estudos/stream-video/stream-video.component';
import { LoginComponent } from './1-autenticar/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login/adm' },
  { path: 'cadastrar/:tipo', component: CadastroComponent },
  { path: 'login/:tipo', component: LoginComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  {
    path: 'interface', component: InterfaceComponent,
    children: [
      { path: '', component: PaginaNaoEncontradaComponent },
      { path: 'new-modulo', loadChildren: () => import('./4-modulos/new-modulo/new-modulo.module').then(m => m.NewModuloModule) },
      { path: 'new-modulo/:acao/:item', loadChildren: () => import('./4-modulos/new-modulo/new-modulo.module').then(m => m.NewModuloModule) },
      { path: 'apresentador', component: ApresentadorComponent },
      { path: 'apresentador/:acao/:item', component: ApresentadorComponent },
      { path: 'gravar-video', component: VideoGravarComponent },
      { path: 'gravar-video/:acao/:item', component: VideoGravarComponent },
      { path: 'stream-video', component: StreamVideoComponent },
      { path: 'stream-video/:acao/:item', component: StreamVideoComponent },
      { path: 'revenda', loadChildren: () => import('./4-modulos/revenda/revenda.module').then(m => m.RevendaModule) },
      { path: 'revenda/:acao/:item', loadChildren: () => import('./4-modulos/revenda/revenda.module').then(m => m.RevendaModule) },
      { path: '**', component: PaginaNaoEncontradaComponent },
    ]
  },
  { path: '**', component: PaginaNaoEncontradaComponent }

  /* { path: 'interface', loadChildren: () => import('./interface/interface.module').then(m => m.InterfaceModule) }, */
  /* { path:'**', component: NovoModuloComponent}, */
  /* { path:'', redirectTo: 'test', pathMatch: 'full'}, */
  /* { path: 'interface', canActivate: [AngularFireAuthGuard], loadChildren: () => import('./interface/interface.module').then(m => m.InterfaceModule) }, */
  //canActivate: [AngularFireAuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
