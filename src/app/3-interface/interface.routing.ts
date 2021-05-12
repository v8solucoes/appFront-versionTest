import { Routes, RouterModule } from '@angular/router';
import { InterfaceComponent } from './interface.component';

const routes: Routes = [
  {
    path: '', component: InterfaceComponent,
    children: [
      { path: 'apresentador/:pagina/:acao', loadChildren: () => import('../4-modulos/apresentador/apresentador.module').then(m => m.ApresentadorModule) },
      /* { path: ':modulo', loadChildren: () => import('./modulo/modulo.module').then(m => m.ModuloModule) } */
    ]
  },
];

export const InterfaceRoutes = RouterModule.forChild(routes);
