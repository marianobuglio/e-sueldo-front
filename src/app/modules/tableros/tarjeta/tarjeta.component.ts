import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import {  FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { catchError, Subject, takeUntil, tap } from 'rxjs';
import { Tarjeta } from '../interfaces/tablero';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { CreatePlantillaComponent } from '../create-plantilla/create-plantilla.component';
import { PlantillaService } from '../services/plantilla.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ListPlantillaComponent } from '../list-plantilla/list-plantilla.component';

export interface dataTarjeta{
  card:Tarjeta
}
export interface prioridad{
  nombre:string
}
@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss'],
  animations : fuseAnimations
})

export class TarjetaComponent implements OnInit{
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @Output() tarjeta :EventEmitter<Tarjeta> = new EventEmitter<Tarjeta>()
  cardForm:UntypedFormGroup;
  users:Array<User> ;
  prioridades:Array<prioridad> = [{nombre:"Normal"},{nombre:"Baja"},{nombre:"Alta"}]
  listas: FormArray<any>;
  addLista:Boolean =  false;
  showTarea:number = undefined;
  showIntegrantes:number = undefined;
  state:boolean = false
  environment:any = environment
  comment:string
  user: User;
  

  constructor(
    public matDialogRef: MatDialogRef<TarjetaComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _userService : UserService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog : MatDialog,
    private _fuseConfirmationService : FuseConfirmationService,
    private _plantillaService : PlantillaService,
    @Inject(MAT_DIALOG_DATA) public data:dataTarjeta,

    ){}

  ngOnInit(): void {
    this.getUsers() 
    this.getUser()
  }

  getUsers(){
    this._userService.list().subscribe(
      (res) => {
          this.users = res
      },
      (err)=>{
        console.error(err)
      }
    )
  }

  getUser(){
    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    });
  }

  capareWithPrioridad(option: prioridad, value: prioridad): boolean{
    
    return option?.nombre === value?.nombre

  }

  capareWithUser (option: User, value: User): boolean{
    
    return option?._id === value?._id

  }


  calculoPorcentajeTareas(index:number){
   
    let count = 0
    this.data.card.ListaTareas[index].tareas.forEach(t => {

        if(t.completa){
          count++;
        }

    });
    this.data.card.ListaTareas[index].completado =   Math.trunc((100 * count ) / this.data.card.ListaTareas[index].tareas.length)

  }

  addListaTareas(name:string){
    if(!this.data.card.ListaTareas){
      this.data.card.ListaTareas = []
    }
    this.data.card.ListaTareas.push({
      name:name,
      tareas:[],
      integrantes:[],
      comentarios:[]
    })
  }
  addTarea(listaIndex:number,name:string){
    this.data.card.ListaTareas[listaIndex].tareas.push({
      descripcion:name,

    })
    this.showTarea = undefined;
  }

  showAdd(indexLista:number){
    this.showTarea = indexLista
    this.showIntegrantes = undefined
  }

  showAddintegrantes(listaIndex:number){
    this.showTarea = undefined
    this.showIntegrantes = listaIndex
  }

  getIntegrantesTarjeta(){
    return this.data.card.integrantes
  }

  getIntegrantesLista(listaIndex:number){
    debugger
    return this.data.card.ListaTareas[listaIndex].integrantes
  }

  addUsersToLista(indexLista:number,$event:Array<User>){
    if( this.data.card.ListaTareas[indexLista].integrantes &&  this.data.card.ListaTareas[indexLista].integrantes.length <= 0 ){
      this.data.card.ListaTareas[indexLista].integrantes = []
    }
    this.data.card.ListaTareas[indexLista].integrantes = $event
    this.showIntegrantes = undefined
  }

  getAnotherNames(integrantesRestantes: Array<User>):string
  {
    let names = ''
    integrantesRestantes.map((i,index) => { 
      if(index + 1 < integrantesRestantes.length){
        names += i.displayName + ', '
      }else{
        names += i.displayName
      }
    })
    return names
  }

  addComment(indexLista){
    if ( !this.comment || this.comment.trim() === '' )
    {
        return;
    }
    if(!this.data.card.ListaTareas[indexLista].comentarios){
      this.data.card.ListaTareas[indexLista].comentarios = []
    }
    this.data.card.ListaTareas[indexLista].comentarios.push({
      comentario:this.comment,
      usuario:this.user
    })

    this.comment = ''
  }

  save(){
    this.matDialogRef.close(this.data.card)
  }

  openDialogPlantilla(){
    const dialogSavePlantilla =this._matDialog.open(CreatePlantillaComponent, {
      data:{
        name:'',
        ListaTareas:this.data.card.ListaTareas,
        tipo:'tablero'
      }
    })
    dialogSavePlantilla.afterClosed().subscribe(result => {
      if(result){
        this._plantillaService.create(result).subscribe(
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
                this.data.card.plantillaTarea = res._id
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
            dialogRef.afterClosed().subscribe((result) => {
            })
            
          }
        )
      }

    });
  }

  openDialogListPlantillas(){
    const dialogListPlantilla =this._matDialog.open(ListPlantillaComponent,{
      data:'tablero'
    })
    dialogListPlantilla.afterClosed().subscribe((plantilla) => {
      debugger 
      if(plantilla){
        this.data.card.ListaTareas = plantilla.ListaTareas
        this.data.card.plantillaTarea = plantilla._id
      }
    })
  }
}