import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Recibo } from '../interfaces/recibo';
import { ModalReciboComponent } from '../modal-recibo/modal-recibo.component';
import { environment } from 'environments/environment';
import {SelectionModel} from '@angular/cdk/collections';
import { PinComponent } from '../pin/pin.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { RecibosToSend } from '../interfaces/recibosToSend';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import * as moment from 'moment';
import { ReciboService } from '../services/recibo.service';
import { MatTableFilter } from 'mat-table-filter';


@Component({
  selector: 'app-listado-mes',
  templateUrl: './listado-mes.component.html',
  styleUrls: ['./listado-mes.component.scss']
})
export class ListadoMesComponent implements OnInit, AfterViewInit, OnChanges{
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input() recibos:Array<Recibo>
  @Input() firmar:Boolean
  @Output() valueFirmar = new EventEmitter<Boolean>();
  @Output() recibosFirmados = new EventEmitter<Boolean>();

  displayedColumns: string[] = ['todo','imagen','legajo', 'periodo', 'tipoRecibo', 'firmaEmpleador', 'firmaEmpleado', 'acciones'];
  dataSource= new MatTableDataSource<Recibo>();
  selection = new SelectionModel<Recibo>(true, []);
  recibosToSend: RecibosToSend 
  reciboSelected: Recibo
  reciboExample:Recibo
  filterType: MatTableFilter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  user: User;
  constructor(
    private _matDialog : MatDialog,
    private _fuseConfirmationService : FuseConfirmationService,
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _recibosService :ReciboService,

    ){
    
  }

 



  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes.firmar.currentValue){
      this.getPinFirma()
    }
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Recibo>(this.recibos)
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
    this._changeDetectorRef.detectChanges()
  }

  ngOnInit(): void {
    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    });

  }

  showModal(url){
    this._matDialog.open(ModalReciboComponent, {
      data: {pdfPath:environment.url + url.split("./")[1] }
    })
  }
  checkboxLabel(row?: Recibo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} `;
  }

   // seleccion de recibos
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getPinFirma(){
    
    if(this.selection.selected.length > 0){
      const dialogPin =this._matDialog.open(PinComponent, {
        data:{pin:''}
      })
      dialogPin.afterClosed().subscribe(result => {
        console.log(this.selection.selected)
        this.recibosToSend = {
          certPassword : result,
          empleador : true,
          motivo : this.user.cargoFirma ? this.user.cargoFirma : "APORDERADO",
          recibos : this.selection.selected,
          fecha: moment().format('DD/MM/YYYY HH:mm ').toString()
        }
        this._recibosService.signPdf(this.recibosToSend).subscribe(
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
            this.recibosFirmados.emit(true)
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
        this.valueFirmar.emit(false);
      });
    }else{
      const dialogRef = this._fuseConfirmationService.open({
        "title": "Recibos ",
        "message": "Seleccione al menos un recibo",
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

      dialogRef.afterClosed().subscribe((result) => {
          this.firmar = false
          this.valueFirmar.emit(this.firmar);   
      })
    }
  }
}


