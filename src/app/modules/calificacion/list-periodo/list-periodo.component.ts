import {
  AfterViewInit,
    Component,
    Inject,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
  MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
    MatPaginator
} from '@angular/material/paginator';
import {
    MatTableDataSource
} from '@angular/material/table';
import {
    Router
} from '@angular/router';
import {
    FuseConfirmationService
} from '@fuse/services/confirmation';
import {
    TableroCalificacion
} from '../interfaces/calificacion';
import {
    CalificacionService
} from '../services/calificacion.service';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE
} from '@angular/material/core';
import {
    MatDatepicker
} from '@angular/material/datepicker';
import {
    MENSUAL
} from 'app/core/formatosFechas/formatosFecha';
import {
    default as _rollupMoment,
    Moment
} from 'moment';
import * as _moment from 'moment';

import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
    Observable
} from 'rxjs';
import { ListLegajosComponent } from '../list-legajos/list-legajos.component';
import { User } from 'app/core/user/user.types';
import { Tarjeta } from 'app/modules/tableros/interfaces/tablero';

export interface dataPeriodos {
    tableroPadre: TableroCalificacion,
        tablerosSeleccionados: Array < TableroCalificacion >
}

@Component({
    selector: 'app-list-periodo',
    templateUrl: './list-periodo.component.html',
    styleUrls: ['./list-periodo.component.scss'],
    providers: [{
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MENSUAL
        },
    ]
})

export class ListPeriodoComponent implements OnInit,AfterViewInit {
    displayedColumns: string[] = ['name', 'periodo', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource = new MatTableDataSource < any > ();
    formPeriodo: FormGroup
    constructor(
        private _formBuilder: FormBuilder,
        public matDialogRef: MatDialogRef < ListPeriodoComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: dataPeriodos,
        private _router: Router,
        private _calificacionService: CalificacionService,
        private _fuseConfirmationService: FuseConfirmationService,
        private matDialog : MatDialog
    ) {

    }
  ngAfterViewInit(): void {
    this.dataSource.data = this.data.tablerosSeleccionados
    this.dataSource.paginator = this.paginator;
  }
    get periodo() {
        return this.formPeriodo.get('periodo');
    }

    ngOnInit(): void {
    
        this.formPeriodo = this._formBuilder.group({
            periodo: new FormControl(_moment(), [
                Validators.required
            ]),
            integrantes: [
                [], Validators.required
            ]
        })
    }
   
    nuevosIntegrantes(): Observable < any > {
        const dialogRef = this._fuseConfirmationService.open({
            "title": "Integrantes",
            "message": "Desea agregar nuevos intecrantes",
            "icon": {
                "show": true,
                "name": "done",
                "color": "success"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "Si quiero agregar",
                    "color": "primary"
                },
                "cancel": {
                    "show": true,
                    "label": "No, continuar"
                }
            },
            "dismissible": true
        });
        return dialogRef.afterClosed()


    }
    generarTarjetas(nuevosIntegrantes: Array<User>,listaTareas):Array<Tarjeta>{
      let tarjeta:Tarjeta 
     const newTarjetas = nuevosIntegrantes.map((integrante)=>{
      return tarjeta = {
          legajo : integrante,
          ListaTareas : listaTareas,
          prioridad : {nombre:"Baja"},
        }
         
      })
      return newTarjetas
    }
    nuevoPeriodo() {
        
        this.nuevosIntegrantes().subscribe(
            (result) => {
              let nuevoPeriodo: TableroCalificacion = this.data.tablerosSeleccionados[this.data.tablerosSeleccionados.length - 1]
              this.enviarPrimeraFila(nuevoPeriodo)
              debugger
                if (result === 'confirmed') {
                    //abro modal
                   const matDialogRef =  this.matDialog.open(ListLegajosComponent)
                   matDialogRef.afterClosed().subscribe(
                    (result) => {
                      debugger
                      if(result.length > 0){
                        let nuevosIntegrantes = result
                        this.formPeriodo.get('integrantes').setValue([...nuevosIntegrantes])
                        const listaTareas = nuevoPeriodo.listas[0].tasks[0].ListaTareas
                        const newTarjetas = this.generarTarjetas(nuevosIntegrantes,listaTareas)
                        nuevoPeriodo.listas[0].tasks = [...newTarjetas]
                        if (!this.formPeriodo.valid) {
                          return false
                        }
                        this.guardarPeriodo(nuevoPeriodo)
                      }
                    }
                   )
                } else {
                    this.formPeriodo.get('integrantes').setValue(this.data.tablerosSeleccionados[this.data.tablerosSeleccionados.length - 1].integrantes)
                    this.guardarPeriodo(nuevoPeriodo)
                }
            }
        )

    }

    guardarPeriodo(nuevoPeriodo){
      nuevoPeriodo.tableroPadre = this.data.tableroPadre._id
      delete nuevoPeriodo._id
      nuevoPeriodo.padre = false
      nuevoPeriodo.periodo = this.formPeriodo.get('periodo').value

      this._calificacionService.create(nuevoPeriodo).subscribe(
          (res) => {
              const dialogRef = this._fuseConfirmationService.open({
                  "title": "Periodo",
                  "message": "Periodo Guardado correctamente",
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
              dialogRef.afterClosed().subscribe((result) => {
                  this.goTablero(res._id)
              })
          },
          (err) => {
              const dialogRef = this._fuseConfirmationService.open({
                  "title": "Plantilla",
                  "message": "Error al guardar periodo",
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
              });
          }
      )
    }
    enviarPrimeraFila(nuevoPeriodo: TableroCalificacion) {
        nuevoPeriodo.listas.map((lista, indexLista) => {
            if (indexLista > 0 && lista.tasks.length > 0) {
                lista.tasks.map((tarjeta, indexTarjeta) => {
                    nuevoPeriodo.listas[0].tasks.push(tarjeta)
                    lista.tasks.splice(indexTarjeta)
                })
            }
        })
    }
    delete(periodo) {

    }

    goTablero(id: string) {
      this.matDialogRef.close()
        this._router.navigate([`/calificacion/${id}`])
    }

    setMonth(normalizedMonthAndYear: Moment, datepicker: MatDatepicker < Moment > ) {
        const ctrlValue = this.formPeriodo.get('periodo').value!;
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.formPeriodo.get('periodo').setValue(ctrlValue);
        datepicker.close();
    }
}
