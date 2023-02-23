import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { CalificacionRoutingModule } from './calificacion-routing.module';
import { ListComponent } from './list/list.component';
import { ListPeriodoComponent } from './list-periodo/list-periodo.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TablerosModule } from '../tableros/tableros.module';
import { MatMenuModule } from '@angular/material/menu';
import { ListLegajosComponent } from './list-legajos/list-legajos.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    ListComponent,
    ListPeriodoComponent,
    CalificacionComponent,
    ListLegajosComponent
  ],
  imports: [
    CommonModule,
    CalificacionRoutingModule,
    SharedModule,
    DragDropModule,
    TablerosModule,
    MatMenuModule,
    MatCheckboxModule
  ]
})
export class CalificacionModule { }
