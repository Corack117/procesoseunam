import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatrixComponent } from './matrix.component';
import { ToolbarMatrixComponent } from './toolbar-matrix/toolbar-matrix.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '',  component: MatrixComponent },
      // { path: '', component: MatrixComponent, outlet: 'sidebar' },
      // { path: '', component: ToolbarMatrixComponent, outlet: 'toolbar' },
      // { path: '', redirectTo: 'general', pathMatch: 'full' },
      // { path: 'general', component: GeneralComponent },
      // { path: 'direcciones', component: DireccionesComponent },
      // { path: 'seguridad', component: PersonalComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatrixRoutingModule { }
