import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { ListComponent } from './list/list.component';
import { CalificacionResolver } from './resolvers/calificacion.resolver';

const routes: Routes = [
  {
    path:'',
    component:ListComponent
  },
  {
    path:':id',
    component:CalificacionComponent,
    resolve  : {
      board: CalificacionResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalificacionRoutingModule { }
