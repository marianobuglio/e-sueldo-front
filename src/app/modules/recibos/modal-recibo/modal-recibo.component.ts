import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface modalReciboData {
  pdfPath:string
}
@Component({
  selector: 'modal-recibo',
  templateUrl: './modal-recibo.component.html',
  styleUrls: ['./modal-recibo.component.scss']
})
export class ModalReciboComponent {
  constructor(
    public matDialogRef: MatDialogRef<ModalReciboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: modalReciboData,
  ){

  }
 
}
