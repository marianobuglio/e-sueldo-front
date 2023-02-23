import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { RecibosRoutingModule } from './recibos-routing.module';
import { ListComponent } from './list/list.component';
import { DetalleMesComponent } from './detalle-mes/detalle-mes.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ListadoMesComponent } from './listado-mes/listado-mes.component';
import { ModalReciboComponent } from './modal-recibo/modal-recibo.component';
import { PipeModule } from 'app/pipes/pipe.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PinComponent } from './pin/pin.component';
import { DetalleReciboComponent } from './detalle-recibo/detalle-recibo.component';
import { ListadoUserComponent } from './listado-user/listado-user.component';
import { FileUploadModule } from 'app/core/fileUpload/file-upload.module';
import { SubirRecibosComponent } from './subir-recibos/subir-recibos.component';
import { MatTableFilterModule } from 'mat-table-filter';

@NgModule({
  declarations: [
    ListComponent,
    DetalleMesComponent,
    ListadoMesComponent,
    ModalReciboComponent,
    PinComponent,
    DetalleReciboComponent,
    ListadoUserComponent,
    SubirRecibosComponent,
    
  ],
  imports: [
    CommonModule,
    RecibosRoutingModule,
    SharedModule,
    NgApexchartsModule,
    PipeModule,
    NgxExtendedPdfViewerModule,
    MatCheckboxModule,
    FileUploadModule,
    MatTableFilterModule
  ]
})
export class RecibosModule { }
