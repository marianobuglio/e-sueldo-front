import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleMesComponent } from './detalle-mes/detalle-mes.component';
import { ListComponent } from './list/list.component';
import { ListadoUserComponent } from './listado-user/listado-user.component';
const routes: Routes = [
  {
    path:'',
    component:ListComponent,
  },
  {
    path:'user',
    component:ListadoUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecibosRoutingModule { }
