import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MENSUAL } from 'app/core/formatosFechas/formatosFecha';
import {default as _rollupMoment, Moment} from 'moment';
import { tipoLiqui } from 'app/modules/tipoLiquidacion/interface/tipoLiquidacion';
import { TipoLiquidacionService } from 'app/modules/tipoLiquidacion/services/tipo-liquidacion.service';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { uploadRecibo } from '../interfaces/uploadRecibos';
import { ReciboService } from '../services/recibo.service';

@Component({
  selector: 'app-subir-recibos',
  templateUrl: './subir-recibos.component.html',
  styleUrls: ['./subir-recibos.component.scss'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MENSUAL},
  ]
})
export class SubirRecibosComponent implements OnInit {
  @Output() close = new EventEmitter<string>();
  @Output() getRecibos = new EventEmitter<string>();
  
  tiposLiquidacion:Array<tipoLiqui> = []
  url:string
  uploadForm: FormGroup;
  constructor(
    private _tipoLiquiService:TipoLiquidacionService,
    private _reciboService: ReciboService,
    private _fuseConfirmationService: FuseConfirmationService
  ){

  }



  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      periodo : new FormControl(_moment(),[
        Validators.required
      ]),
      tipoLiqui : new FormControl(null,[
        Validators.required
      ]),
      url: new FormControl(null,[
        Validators.required
      ])
    }
    )
    this.getLiquidaciones()
  }
  get periodo() { return this.uploadForm.get('periodo'); }
  get tipoLiqui() { return this.uploadForm.get('tipoLiqui'); }
  get urlUpload() { return this.uploadForm.get('url'); }

  setMonth(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.uploadForm.get('periodo').value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.uploadForm.get('periodo').setValue(ctrlValue);
    datepicker.close();
  }

  getLiquidaciones(){
    this._tipoLiquiService.list().subscribe(
      (res) => {
        this.tiposLiquidacion = res
        console.log(res)
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  setUrl(event){
    this.urlUpload.setValue(event)
  }

  getFormValidationErrors():string {
    let message:string = "Debe completar los siguientes datos: "
    Object.keys(this.uploadForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.uploadForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          if(key === 'tipoLiqui'){
            message += '<br> * Seleccione tipo liquidación'
          }
          if(key === 'periodo'){
            message += '<br> * Seleccione periodo'
          }
          if(key === 'url'){
            message += '<br> * Suba un archivo de recibos'
          }
         console.log(message);
        });
      }
    });
    return message
  }
  sendPDF(){
    
    if(this.uploadForm.valid){
      
      const reciboUpload:uploadRecibo = {
        urlPdf: this.urlUpload.value,
        periodo: _moment(this.uploadForm.get('periodo').value).format("MM/YYYY"),
        tipo:this.uploadForm.get('tipoLiqui').value,
        fileManager: false   
      }
     this._reciboService.uploadPdf(reciboUpload).subscribe(
      (res) => {
        console.log(res)
        const dialogRef = this._fuseConfirmationService.open({
          "title": "Recibos",
          "message": "Recibos subidos correctamente",
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
            "cancel": {
              "show": false,
            },
          },
          "dismissible": true
        });
        this.getRecibos.emit("traerRecibos")
      },
  
      
      (err)=>{
        const dialogRef = this._fuseConfirmationService.open({
          "title": "Recibos",
          "message": "Ocurrio un error al subir los recibos",
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
            "cancel": {
              "show": false,
            },
          },
          "dismissible": true
        });
      }
     )
    }else{
      let message = this.getFormValidationErrors()
      const dialogRef = this._fuseConfirmationService.open({
        "title": "Recibos",
        "message": message,
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
          "cancel": {
            "show": false,
          },
        },
        "dismissible": true
      });
      
    }
  }
}
