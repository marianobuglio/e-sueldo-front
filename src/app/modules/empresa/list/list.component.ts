import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from '../service/empresa.service';
import { MatPaginator } from '@angular/material/paginator';
import { FuseConfirmationService } from '@fuse/services/confirmation';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  empresas: Array<any> = []
  displayedColumns: string[] = ['name', 'tipo', 'cuit', 'direccion','acciones'];
  periodo:Date
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

  searchInputControl: UntypedFormControl = new UntypedFormControl();
  drawerMode: 'side' | 'over';

  constructor(
    private _empresaService: EmpresaService,
    private _fuseConfirmationService : FuseConfirmationService
  ){

  }
  ngOnInit(): void {
    this.getEmpresas()
    this.periodo = new Date()
  }
  getEmpresas(){
    this._empresaService.list().subscribe(
      (res) => {
        console.log(res)
        this.dataSource.data = res
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  delete(id:string){
    const dialogRef = this._fuseConfirmationService.open({
      "title": "Empresa ",
      "message": "Desea eliminar la empresa?",
      "icon": {
        "show": true,
        "name": "help_outline",
        "color": "primary"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Eliminar",
          "color": "primary"
        },
        "cancel": {
          "show": true,
          "label": "Cancelar"
        }
      },
      "dismissible": true
    });
    dialogRef.afterClosed().subscribe((result) => {
      
      if(result ===  'confirmed'){
        this._empresaService.delete(id).subscribe(
          res =>{
            
            const dialogRef = this._fuseConfirmationService.open({
              "title": "Empresa ",
              "message": "Empresa Eliminada correctamente",
              "icon": {
                "show": true,
                "name": "done",
                "color": "success"
              },
              "actions": {
                "confirm": {
                  "show": true,
                  "label": "OK",
                  "color": "primary"
                },
                "cancel": {
                  "show": false,
                  "label": "Cancel"
                }
              },
              "dismissible": true
            });
            this.getEmpresas()
          },
          err=>{
            const dialogRef = this._fuseConfirmationService.open({
              "title": "Empresa ",
              "message": "Ocurrio un error al Eliminar la Empresa",
              "icon": {
                "show": true,
                "name": "warning",
                "color": "warning"
              },
              "actions": {
                "confirm": {
                  "show": true,
                  "label": "OK",
                  "color": "primary"
                },
                "cancel": {
                  "show": false,
                  "label": "Cancel"
                }
              },
              "dismissible": true
            });
          }
        )
      }
  });
  }
 

}
