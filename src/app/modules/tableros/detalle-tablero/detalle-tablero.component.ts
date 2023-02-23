import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { User } from 'app/core/user/user.types';
import { CreatePlantillaTableroComponent } from '../create-plantilla-tablero/create-plantilla-tablero.component';
import { plantillaTableroGeneral } from '../interfaces/plantillaTablero';
import { Tablero } from '../interfaces/tablero';
import { PlantillaService } from '../services/plantilla.service';


@Component({
  selector: 'app-detalle-tablero',
  templateUrl: './detalle-tablero.component.html',
  styleUrls: ['./detalle-tablero.component.scss']
})
export class DetalleTableroComponent implements OnInit {
  formDetalle :FormGroup
  @Input() tablero:Tablero
  @Input() users: Array<User>
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() actualizar: EventEmitter<Tablero> = new EventEmitter<Tablero>()
  @Output() savePlantilla: EventEmitter<plantillaTableroGeneral> = new EventEmitter<plantillaTableroGeneral>()
  constructor(
    private _formBuilder : FormBuilder,
    private _matDialog : MatDialog,
    private _platillaService : PlantillaService,
    private _fuseConfirmationService : FuseConfirmationService
  ){}
  ngOnInit(): void {
    this.formDetalle = this._formBuilder.group({
      name:['',Validators.required],
      integrantes:[[],Validators.required],
    })

    this.formDetalle.patchValue({
      name:this.tablero.name,
      integrantes:this.tablero.integrantes
    })

    console.log('tabl',this.formDetalle.get('integrantes').value)
  }

  copareWithUser(option: User, value: User): boolean{
    
    return option?._id === value?._id
  }

  save(){
    if(!this.formDetalle.valid){
      return false
    }

    this.tablero.name = this.formDetalle.get('name').value
    this.tablero.integrantes = this.formDetalle.get('integrantes').value
    this.actualizar.emit(this.tablero)
  }

  openTableroPLantilla(){
    this._matDialog.open(CreatePlantillaTableroComponent, {
      data:{
        name:'',
        listas:this.tablero.listas,
        plantillaTarjeta:null,
        tipo:'tablero'
      },
      
    })
    .afterClosed()
    .subscribe((plantilla) => {
      this._platillaService.createTablero(plantilla).subscribe(
        (res)=>{
          debugger
          const dialogRef = this._fuseConfirmationService.open({
            "title": "Plantilla",
            "message": "Plantilla Guardada correctamente",
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
             this.savePlantilla.emit(res)
          })
        },
        (err)=>{
          console.log(err)
          const dialogRef = this._fuseConfirmationService.open({
            "title": "Plantilla",
            "message": "Error al guardar plantilla",
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
    });
   }
}
