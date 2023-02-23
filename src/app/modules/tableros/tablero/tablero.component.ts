import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Columna, Log, Tablero, Tarjeta } from '../interfaces/tablero';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TableroService } from '../services/tablero.service';
import { Subject, takeUntil } from 'rxjs';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit, OnDestroy{
  
  board: Tablero;
  indexLista:number
  indexTarjeta:number
  users:Array<User>
  user: User
    // Private
    private readonly _positionStep: number = 65536;
    private readonly _maxListCount: number = 200;
    private readonly _maxPosition: number = this._positionStep * 500;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _routes: ActivatedRoute,
    private _tableroService: TableroService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _userService: UserService

  ){

  }
  ngOnInit(): void {
    this._tableroService.board$
    .pipe(
      takeUntil(this._unsubscribeAll)
    
      )
    .subscribe((board: Tablero) => {
      
        this.board = {...board};
        this.setStatesComents()
        // Mark for check
        this._changeDetectorRef.markForCheck();
    });
    this.getUsers()
    this.getUser()
}

    ngOnDestroy(): void
    {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
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
      this._userService.user$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
          this.user = user;
  
          // Mark for check
          this._changeDetectorRef.markForCheck();
      });
    }
  

   /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
   trackByFn(index: number, item: any): any
   {
       return item._id || index;
   }

    

    /**
     * Add new card
     */
    addCard(list: Columna, title: string): void
    {
        // Create a new card model
        const card:Tarjeta =  {
          adjuntos:[],
          description:title,
          ListaTareas:[],
          plantillaTarea:null,
          tickets:[],
          novedades:[],
          created:new Date(),
          integrantes:[],
          prioridad:{nombre:'normal'},
          descripcion:'',
          comentarios:[]
        };
        if(this.board.plantillaTablero && this.board.plantillaTablero.plantillaTarjeta){
          card.ListaTareas = this.board.plantillaTablero.plantillaTarjeta.ListaTareas
          card.plantillaTarea = this.board.plantillaTablero.plantillaTarjeta._id 
        }
        const mensaje =  " agrego tarea: " + card.description
        this.addLog(mensaje)
        list.tasks.push(card)
        this._tableroService.update(this.board,this.board._id).subscribe()
    
    }
 /**
     * Add new list
     *
     * @param title
     */
 addList(title: string): void
 {
     // Limit the max list count
     if ( this.board.listas.length >= this._maxListCount )
     {
         return;
     }

     // Create a new list model
     const list:Columna = {
      name:title,
      tasks:[]
     }
     this.board.listas.push(list)
     const mensaje =  " agrego la lista: " + list.name
     this.addLog(mensaje)
     // Save the list
     this._tableroService.update(this.board,this.board._id).subscribe();
 }
    /**
     * List dropped
     *
     * @param event
     */
    listDropped(event: CdkDragDrop<Columna[]>): void
    {
        // Move the item
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        // Calculate the positions
        const updated = this._calculatePositions(event);

        // Update the lists
        this._tableroService.update(this.board,this.board._id).subscribe();
    }

    /**
     * Card dropped
     *
     * @param event
     */
    cardDropped(event: CdkDragDrop<Tarjeta[]>): void
    {
      debugger
        // Move or transfer the item
        if ( event.previousContainer === event.container )
        {
            // Move the item
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else
        {
            // Transfer the item
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);


            // Update the card's list it
            // event.container.data[event.currentIndex].listId = event.container.id;
        }

        // Calculate the positions
        const updated = this._calculatePositions(event);
   
        // Update the board
        debugger
        const mensaje =  " movio la tarjeta " + event.container.data[event.currentIndex].description +  " a la columna:  " + this.findColumn(event.container.id)
        this.addLog(mensaje)
        this._tableroService.update(this.board,this.board._id).subscribe();
    }
    findColumn(id:string){
      
      for (let index = 0; index < this.board.listas.length; index++) {
        const lista = this.board.listas[index];
        if(lista._id === id){
          return lista.name
        }
      }
    }
     /**
     * Calculate and set item positions
     * from given CdkDragDrop event
     *
     * @param event
     * @private
     */
     private _calculatePositions(event: CdkDragDrop<any[]>): any[]
     {
         // Get the items
         let items = event.container.data;
         const currentItem = items[event.currentIndex];
         const prevItem = items[event.currentIndex - 1] || null;
         const nextItem = items[event.currentIndex + 1] || null;
 
         // If the item moved to the top...
         if ( !prevItem )
         {
             // If the item moved to an empty container
             if ( !nextItem )
             {
                 currentItem.position = this._positionStep;
             }
             else
             {
                 currentItem.position = nextItem.position / 2;
             }
         }
         // If the item moved to the bottom...
         else if ( !nextItem )
         {
             currentItem.position = prevItem.position + this._positionStep;
         }
         // If the item moved in between other items...
         else
         {
             currentItem.position = (prevItem.position + nextItem.position) / 2;
         }
 
         // Check if all item positions need to be updated
         if ( !Number.isInteger(currentItem.position) || currentItem.position >= this._maxPosition )
         {
             // Re-calculate all orders
             items = items.map((value, index) => {
                 value.position = (index + 1) * this._positionStep;
                 return value;
             });
 
             // Return items
             return items;
         }
 
         // Return currentItem
         return [currentItem];
     }

     updateListTitle(event: any, list: Columna): void
     {
         // Get the target element
         const element: HTMLInputElement = event.target;
 
         // Get the new title
         const newTitle = element.value;
 
         // If the title is empty...
         if ( !newTitle || newTitle.trim() === '' )
         {
             // Reset to original title and return
             element.value = list.name;
             return;
         }
 
         // Update the list title and element value
         const mensaje =  " cambio el nombre de la columna " + list.name + " por: " + newTitle
         this.addLog(mensaje)
         list.name = element.value = newTitle.trim();
         // Update the list
         this._tableroService.update(this.board,this.board._id).subscribe();
     }
     
    
     openCardDetails(card:Tarjeta,indexLista:number, indexTarjeta:number){
      this.indexLista = indexLista
      this.indexTarjeta = indexTarjeta
      this._matDialog.open(TarjetaComponent, {
        data:{card:card},
        panelClass:['w-full','md:w-240', 'max-w-none']
      })
      .afterClosed()
      .subscribe((tarjeta) => {
        debugger
        if(tarjeta){
          this._tableroService.update(this.board,this.board._id).subscribe()
        }
      });
     }

     
      /**
     * Focus on the given element to start editing the list title
     *
     * @param listTitleInput
     */
    renameList(listTitleInput: HTMLElement): void
    {
        // Use timeout so it can wait for menu to close
        setTimeout(() => {
            listTitleInput.focus();
        });
    }


     /**
     * Delete the list
     *
     * @param id
     */
     deleteList(index): void
     {  
         // Open the confirmation dialog
         const confirmation = this._fuseConfirmationService.open({
             title  : 'Eliminar Lista',
             message: 'Esta seguro que desea eliminar esta lista? Se eliminaran las tarjetas que contenga',
             actions: {
                 confirm: {
                     label: 'Delete'
                 }
             }
         });
 
         // Subscribe to the confirmation dialog closed action
         confirmation.afterClosed().subscribe((result) => {
 
             // If the confirm button pressed...
             if ( result === 'confirmed' )
             {
                const mensaje =  " elimino la columna " + this.board.listas[index].name 
                this.board.listas.splice(index,1)
                this.addLog(mensaje)
                 // Delete the list
                 this._tableroService.update(this.board,this.board._id).subscribe();
             }
         });
     }

     setStatesComents(){
      this.board.listas.map((lista)=>{
        lista.tasks.map((tarjeta)=>{
          tarjeta.ListaTareas.map((listaTareas) => {
            listaTareas.expandCollapse = 'collapsed'
            listaTareas.expandCollapseState = false
          })
        })
      })
     }
     save($event){
        debugger
        this.board = $event
        this._tableroService.update(this.board,this.board._id).subscribe()
     }

     guardarPlantilla($event){
      console.log($event)
     }

     addLog(mensaje:string){
      this.board.integrantes.map((integrante)=>{
        debugger
        if(integrante._id !=  this.user._id){
          const _log:Log = {
            tablero: this.board._id,
            mensaje : mensaje,
            userNotificacion: integrante._id,
            user: this.user._id
          }
          if(!this.board.logs){
            this.board.logs = []
          }
          this.board.logs.push(_log)
        }
      })
     }
}
