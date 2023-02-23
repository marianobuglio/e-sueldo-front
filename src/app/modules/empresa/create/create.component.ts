import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { EmpresaService } from '../service/empresa.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  empresaForm: FormGroup;
  tiposEmpresa: Array<any> = [{name:"Privada"},{name:"Pública"}]
  constructor(
    private _formBuilder : FormBuilder,
    private _empresaService : EmpresaService,
    private _fuseConfirmationService : FuseConfirmationService,
    private _router : Router,
    private _routes : ActivatedRoute,
  ){

  }
  ngOnInit(): void {
    this.empresaForm = this._formBuilder.group({
      name : ['', Validators.required],
      domicilio :['',Validators.required],
      telefono:['',Validators.required],
      cuit:['',Validators.required],
      email:['',Validators.required],
      tipoEmpresa:['',Validators.required],
      cp:['',Validators.required],
    })

  }
  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;


  create(){
    if(this.empresaForm.invalid){
      return false
    }
   
      this._empresaService.create(this.empresaForm.value).subscribe(
        (res) => {
          const dialogRef = this._fuseConfirmationService.open({
            "title": "Empresa ",
            "message": "Empresa Creada Correctamente",
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
          dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            this._router.navigateByUrl("/empresa");
        });
        },
        (err) => {
          const dialogRef = this._fuseConfirmationService.open({
            "title": "Empresa ",
            "message": "Ocurrio un error al crear la empresa",
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
          dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
        }
      )
    
  }


}
