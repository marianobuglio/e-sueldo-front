import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { plantillaTablero, plantillaTableroGeneral } from '../interfaces/plantillaTablero';
import { PlantillaService } from '../services/plantilla.service';


@Component({
  selector: 'app-create-plantilla-tablero',
  templateUrl: './create-plantilla-tablero.component.html',
  styleUrls: ['./create-plantilla-tablero.component.scss']
})

export class CreatePlantillaTableroComponent implements OnInit{
  plantillas:Array<plantillaTablero>
  constructor(
    public matDialogRef: MatDialogRef<CreatePlantillaTableroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: plantillaTableroGeneral,
    private _plantillaService: PlantillaService,
    private _fuseConfirmationService : FuseConfirmationService
  ){}

  ngOnInit(): void {
    this.getPlantillas()
  }

  save(){
    debugger
    if(!this.data.name || this.data.name.trim() === '' ){
      return false
    }
    this.matDialogRef.close(this.data)
  }

  getPlantillas(){
    this._plantillaService.list().subscribe(
      (res)=>{
          this.plantillas = this.filterPlantilla(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  filterPlantilla(plantillas:Array<plantillaTablero>):Array<plantillaTablero>{
    return plantillas.filter((p)=>{
      if(p.tipo === 'tablero') 
      return p
    })
  }
}
