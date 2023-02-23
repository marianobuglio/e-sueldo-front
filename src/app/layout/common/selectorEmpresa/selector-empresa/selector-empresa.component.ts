import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'selector-empresa',
  templateUrl: './selector-empresa.component.html',
  styleUrls: ['./selector-empresa.component.scss']
})
export class SelectorEmpresaComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  user: User;

  constructor(
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,

  ){
    
  }
  ngOnInit(): void {
    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    });
  }

   /**
     * Update empresaActiva
     *
     * @param empresaAtiva
     */
   updateEmpresaActiva(empresaActiva: string): void
   {
       // Return if user is not available
       if ( !this.user )
       {
           return;
       }

       // Update the user
       this._userService.updateEmpresaActiva(empresaActiva).subscribe();
   }

   nameEmpresa(){
    const index = this.user.empresas.map((e)=> e._id).indexOf(this.user.empresa)
    return  this.user.empresas[index].name
   }

}
