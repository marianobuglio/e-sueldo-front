import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Recibo } from '../interfaces/recibo';
import { PinComponent } from '../pin/pin.component';
import * as moment from 'moment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { RecibosToSend } from '../interfaces/recibosToSend';
import { ReciboService } from '../services/recibo.service';

@Component({
  selector: 'app-detalle-recibo',
  templateUrl: './detalle-recibo.component.html',
  styleUrls: ['./detalle-recibo.component.scss']
})
export class DetalleReciboComponent implements OnChanges {
  recibosToSend: RecibosToSend 
  constructor(
    private _fuseConfirmationService : FuseConfirmationService,
    private _matDialog : MatDialog,
    private _reciboService: ReciboService
  ){
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  @Input() recibo: Recibo
  @Output() close = new EventEmitter<string>();
  @Output() firmado = new EventEmitter<boolean>()
  getPinFirma(recibo:Recibo){
    
    const dialogPin =this._matDialog.open(PinComponent, {
      data:{pin:''}
    })
    dialogPin.afterClosed().subscribe(result => {
      
      this.recibosToSend = {
        certPassword : result,
        empleador : false,
        motivo : "Conformidad",
        recibos : [recibo],
        fecha: moment().format('DD/MM/YYYY HH:mm ').toString()
      }
      this._reciboService.signPdf(this.recibosToSend).subscribe(
        (res) => {
          const dialogRef = this._fuseConfirmationService.open({
            "title": "Firma ",
            "message": "Recibos Firmados",
            "icon": {
              "show": true,
              "name": "done",
              "color": "success"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "ok",
                "color": "primary"
              },
            },
            "dismissible": true
          });          
          this.firmado.emit(true)
        },
        (err) => {
          
          const dialogRef = this._fuseConfirmationService.open({
            "title": "Firma ",
            "message": err.error.message,
            "icon": {
              "show": true,
              "name": "warning",
              "color": "warning"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "ok",
                "color": "primary"
              },
            },
            "dismissible": true
          });          }
      )
    });

}
}
