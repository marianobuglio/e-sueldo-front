import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Component({
  selector: 'app-list-legajos',
  templateUrl: './list-legajos.component.html',
  styleUrls: ['./list-legajos.component.scss']
})
export class ListLegajosComponent implements OnInit,AfterViewInit{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    users:Array<User>
    dataSource= new MatTableDataSource<User>();
    selection = new SelectionModel<User>(true, []);
    displayedColumns: string[] = ['todo','imagen','name'];
    constructor(
      public matDialogRef: MatDialogRef<ListLegajosComponent>,
      private _userService: UserService,
      private _changeDetectorRef: ChangeDetectorRef,
      private _fuseConfirmationService: FuseConfirmationService

    ){

    }
    ngOnInit(): void {
      
    }
    ngAfterViewInit(): void {
      debugger
      this._userService.list().subscribe(
        (res) => {
          this.users = res
          this.dataSource = new MatTableDataSource<User>(this.users)
          this.dataSource.paginator = this.paginator;
          this._changeDetectorRef.detectChanges()
        },
        (err) => {
          console.log(err)
        }
      )
    }
    checkboxLabel(row?: User): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} `;
    }
  
     // seleccion de recibos
     isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

    save(){
        if(this.selection.selected.length > 0){
          this.matDialogRef.close(this.selection.selected)
        }else{
          const dialogRef = this._fuseConfirmationService.open({
            "title": "Usuarios",
            "message": "Seleccione al menos un usuario",
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
