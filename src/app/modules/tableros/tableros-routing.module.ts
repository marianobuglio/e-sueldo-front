import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TableroResolver } from './resolvers/tablero.resolver';
import { TableroComponent } from './tablero/tablero.component';

const routes: Routes = [
  {
    path:'',
    component:ListComponent
  },
  {
    path:':id',
    component:TableroComponent,
    resolve  : {
      board: TableroResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablerosRoutingModule { }
