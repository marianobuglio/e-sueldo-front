import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePlantillaComponent } from '../create-plantilla/create-plantilla.component';
import { plantillaTablero } from '../interfaces/plantillaTablero';
import { PlantillaService } from '../services/plantilla.service';

@Component({
  selector: 'app-list-plantilla',
  templateUrl: './list-plantilla.component.html',
  styleUrls: ['./list-plantilla.component.scss']
})
export class ListPlantillaComponent implements OnInit {
  displayedColumns: string[] = ['name', 'listaTareas','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  plantillas:Array<plantillaTablero>
  constructor(
    public matDialogRef: MatDialogRef<CreatePlantillaComponent>,
    private _plantillaService: PlantillaService,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ){

  }
  ngOnInit(): void {
    this.getPlantillas()
  }

  getPlantillas(){
    this._plantillaService.list().subscribe(
      (res)=>{
          this.plantillas = this.filterPlantilla(res)
          this.dataSource.data = this.plantillas
          this.dataSource.paginator = this.paginator;
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

  seleccionarPlantilla(plantilla:plantillaTablero){
    this.matDialogRef.close(plantilla)
  } 
}
