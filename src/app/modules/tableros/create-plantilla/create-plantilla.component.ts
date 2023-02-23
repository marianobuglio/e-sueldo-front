import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { plantillaTablero } from '../interfaces/plantillaTablero';
import { PlantillaService } from '../services/plantilla.service';

@Component({
  selector: 'app-create-plantilla',
  templateUrl: './create-plantilla.component.html',
  styleUrls: ['./create-plantilla.component.scss']
})


export class CreatePlantillaComponent {
  

  constructor(
    public matDialogRef: MatDialogRef<CreatePlantillaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: plantillaTablero,
    private _plantillaService: PlantillaService,
    private _fuseConfirmationService : FuseConfirmationService
  ){}

  save(){
    debugger
    if(!this.data.name || this.data.name.trim() === '' ){
      return false
    }
    this.matDialogRef.close(this.data)
  }
}
