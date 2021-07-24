import { Routes, RouterModule } from '@angular/router';
import { NewModuloComponent } from 'src/app/4-modulos/new-modulo/new-modulo.component';

const routes: Routes = [

    {
        path: '', component: NewModuloComponent,
        children: [
            { path: ':pagina/:acao', component: NewModuloComponent }
        ]
    }
];

export const ModuloRoutes = RouterModule.forChild(routes);
