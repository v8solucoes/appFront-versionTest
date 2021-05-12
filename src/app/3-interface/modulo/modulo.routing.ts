import { Routes, RouterModule } from '@angular/router';
import { NovoModuloComponent } from 'src/app/modulo/novo-modulo/novo-modulo/novo-modulo.component';

const routes: Routes = [

    {
        path: '', component: NovoModuloComponent,
        children: [
            { path: ':pagina/:acao', component: NovoModuloComponent }
        ]
    }
];

export const ModuloRoutes = RouterModule.forChild(routes);
