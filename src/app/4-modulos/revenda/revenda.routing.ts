import { Routes, RouterModule } from '@angular/router';
import { RevendaComponent } from './revenda.component';

const routes: Routes = [
  { path: '', component: RevendaComponent}
];

export const RevendaRoutes = RouterModule.forChild(routes);
