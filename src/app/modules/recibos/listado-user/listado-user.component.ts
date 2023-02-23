import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ANUAL } from 'app/core/formatosFechas/formatosFecha';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { Recibo } from '../interfaces/recibo';
import { RecibosToSend } from '../interfaces/recibosToSend';
import { ModalReciboComponent } from '../modal-recibo/modal-recibo.component';
import { ReciboService } from '../services/recibo.service';


@Component({
  selector: 'app-listado-user',
  templateUrl: './listado-user.component.html',
  styleUrls: ['./listado-user.component.scss'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: ANUAL},
  ]
})
export class ListadoUserComponent implements OnInit{
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  periodo:FormControl = new FormControl(_moment())
  anios: Array<String> = [];
  meses: Array<String> = [];
  recibos: object[];
  reciboSelected:Recibo
  recibosToSend: RecibosToSend 
  user: User;

  constructor(
    private _reciboService: ReciboService,
    private _matDialog : MatDialog,
  ){

  }
  ngOnInit(): void {
    this.getRecibos()
   
  }

  getRecibos(): void{
    this._reciboService.listUser(_moment(this.periodo.value).format('YYYY')).subscribe(
      (res) => { 
        console.log(res)
        this.anios = Object.keys(res[0])
        type ObjectKey = keyof typeof res[0];
        const myVar = this.anios[0] as ObjectKey;
        this.recibos = res[0][myVar]
      } ,
      (err) => {
        console.log(err)
      }
    )
  }
  setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>):void {
    const ctrlValue = this.periodo.value;
    ctrlValue.year(normalizedMonthAndYear.year());
    this.periodo.setValue(ctrlValue);
  }
  assingDataToDetails(recibo){
    this.reciboSelected = recibo
  }
  showModal(url){
    this._matDialog.open(ModalReciboComponent, {
      data: {pdfPath:environment.url + url.split("./")[1] }
    })
  }
  


}
