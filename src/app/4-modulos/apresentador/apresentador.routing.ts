import { Routes, RouterModule } from '@angular/router';
import { ApresentadorComponent } from './apresentador.component';

const routes: Routes = [
  { path: '', component: ApresentadorComponent,

    },
];

export const ApresentadorRoutes = RouterModule.forChild(routes);
