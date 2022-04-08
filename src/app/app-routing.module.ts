import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortadaComponent } from './principal/portada/portada.component';

const routes: Routes = [
  {
    path: '',
    component: PortadaComponent
  },
  {
    path: 'mat',
    redirectTo: 'matrix'
  },
  {
    path: 'ini',
    redirectTo: 'prob-inicial'
  },
  {
    path: 'matrix',
    loadChildren: () => import('./matrix/matrix.module')
    .then(m => m.MatrixModule)
  },
  {
    path: 'prob-inicial',
    loadChildren: () => import('./matrix/matrix.module')
    .then(m => m.MatrixModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
