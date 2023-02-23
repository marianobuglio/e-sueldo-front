import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { TablerosRoutingModule } from './tableros-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { TableroComponent } from './tablero/tablero.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { ScrumboardBoardAddCardComponent } from './add-card/add-card.component';
import { ScrumboardBoardAddListComponent } from './add-list/add-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddListaTareasComponent } from './add-lista-tareas/add-lista-tareas.component';
import { AddTareasComponent } from './add-tareas/add-tareas.component';
import { AddIntegrantesComponent } from './add-integrantes/add-integrantes.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule } from '@angular/material/dialog';
import { CreatePlantillaComponent } from './create-plantilla/create-plantilla.component';
import { ListPlantillaComponent } from './list-plantilla/list-plantilla.component';
import { MatChipsModule } from '@angular/material/chips';
import { DetalleTableroComponent } from './detalle-tablero/detalle-tablero.component';
import { CreatePlantillaTableroComponent } from './create-plantilla-tablero/create-plantilla-tablero.component';
import { CreateComponent } from './create/create.component';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';

@NgModule({
  declarations: [
    ListComponent,
    TableroComponent,
    TarjetaComponent,
    ScrumboardBoardAddCardComponent,
    ScrumboardBoardAddListComponent,
    AddListaTareasComponent,
    AddTareasComponent,
    AddIntegrantesComponent,
    CreatePlantillaComponent,
    ListPlantillaComponent,
    DetalleTableroComponent,
    CreatePlantillaTableroComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    TablerosRoutingModule,
    SharedModule,
    DragDropModule,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    NotificationsModule
  ],
  exports:[
    ScrumboardBoardAddListComponent,
    DetalleTableroComponent,
  ]
})
export class TablerosModule { }
