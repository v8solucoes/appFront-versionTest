import { Routes, RouterModule } from '@angular/router';
import { NewModuloComponent } from './new-modulo.component';

const routes: Routes = [
  { path: '', component: NewModuloComponent,
/*   children: [
    { path: ':acao/:item', component: FormularioComponent},
   ] */
  },

];

export const NewModuloRoutes = RouterModule.forChild(routes);
