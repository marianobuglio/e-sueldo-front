import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';



export interface dataPIN{
  pin:string
}
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {

  constructor(
    public matDialogRef: MatDialogRef<PinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataPIN,
    private _fuseConfirmationService : FuseConfirmationService
  ){

  }

  firmar(){
    if(this.data.pin){
      this.matDialogRef.close(this.data.pin)
    }else{
      const dialogRef = this._fuseConfirmationService.open({
        "title": "Pin ",
        "message": "Ingrese el pin de firma",
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
  }
}
