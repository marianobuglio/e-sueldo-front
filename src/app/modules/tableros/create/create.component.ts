import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { plantillaTableroGeneral } from '../interfaces/plantillaTablero';
import { PlantillaService } from '../services/plantilla.service';
import { TableroService } from '../services/tablero.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  formTablero : FormGroup;
  users:Array<User>;
  plantillas: Array<plantillaTableroGeneral>
  constructor(
    public matDialogRef: MatDialogRef<CreateComponent>,
    private _formBuilder :FormBuilder,
    private _plantillaService: PlantillaService,
    private _userService: UserService,
    private _tableroService: TableroService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _router:Router
  ){}
  ngOnInit(): void {
    this.getUsers()
    this.getPlantillas()
    this.formTablero = this._formBuilder.group({
      name:['',Validators.required],
      integrantes:[[],Validators.required],
      plantillaTablero:[null],
      listas:[[]]
    })
  }

  getUsers(){
    this._userService.list().subscribe(
      (res)=>{
        this.users =  res
      },
      (err)=>{
        console.log(err)
      }

    )
  }

  getPlantillas(){
    this._plantillaService.listPlantillaGeneral().subscribe(
      (res)=>{
        this.plantillas = res
      },
      (err) => {
        console.log(err)
      }
    )
  }
  copareWithPlantilla(option: plantillaTableroGeneral, value: plantillaTableroGeneral): boolean{
    return option?._id === value?._id
  }
  save(){
    if(!this.formTablero.valid){
      return
    }
    this.setPlantillaTablero()
    this._tableroService.create(this.formTablero.value).subscribe(
      (res)=>{
        const dialogRef = this._fuseConfirmationService.open({
          "title": "Tablero",
          "message": "Tablero Creado Correctamente",
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
        dialogRef.afterClosed().subscribe(
          (result)=>{
            this._router.navigate([`/tableros/${res._id}`])
          }
        )
      },
      (err) => {
        console.log(err)
      }
    )
  }

  setPlantillaTablero(){
      debugger
    if(this.formTablero.get('plantillaTablero').value){
      this.formTablero.get('listas').setValue(this.formTablero.get('plantillaTablero').value.listas)
    }
  }

}
