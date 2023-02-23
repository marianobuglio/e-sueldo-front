import { Component, OnInit } from '@angular/core';
import { ReciboService } from '../services/recibo.service';
import { GraficoGeneral } from '../interfaces/datosGraficos';
import { Router } from '@angular/router';
import { Recibo } from '../interfaces/recibo';
import { ANUAL } from 'app/core/formatosFechas/formatosFecha';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: ANUAL},
  ]
})


export class ListComponent implements OnInit{

  anios: Array<String> = [];
  meses: Array<String> = [];
  datoGraficos: Array<GraficoGeneral> = [];
  recibos: object[];
  datosDetalle:GraficoGeneral;
  cantidadRecibos: number;
  recibosSelected: Array<Recibo>;
  periodo:FormControl = new FormControl(_moment())
  firmar:Boolean
  upload:Boolean

  constructor(
    private _reciboService : ReciboService,
    private _router:Router
  ){

  }
  
  ngOnInit(): void {
    this.getRecibos() 
  }

  getRecibos(){
    this._reciboService.list(_moment(this.periodo.value).format('YYYY')).subscribe(
      (res) => { 
        this.anios = Object.keys(res[0])
        type ObjectKey = keyof typeof res[0];
        const myVar = this.anios[0] as ObjectKey;
        this.meses = Object.keys(res[0][myVar])
        this.recibos = res[0]
        this.datoGraficos = res[1]
      } ,
      (err) => {
        
        console.log(err)
      }
    )
  }

  assingDataToDetails(indexMes:number,cantidadRecibos:number){
    
    this.datosDetalle = this.datoGraficos[indexMes]
    this.cantidadRecibos = cantidadRecibos
  }

  selectRecibos(recibos:Array<Recibo>){
    this.recibosSelected = recibos
  }

  setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.periodo.value!;
    ctrlValue.year(normalizedMonthAndYear.year());
    this.periodo.setValue(ctrlValue);
  }



}
