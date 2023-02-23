import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
@Component({
  selector: 'app-add-integrantes',
  templateUrl: './add-integrantes.component.html',
  styleUrls: ['./add-integrantes.component.scss']
})
export class AddIntegrantesComponent {


  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('titleAutosize') titleAutosize: CdkTextareaAutosize;
  @Input() buttonTitle: string = 'Añadir Integrantes';
  @Input() integrantesTarjeta: Array<User>
  @Input() integrantesLista: Array<string>
  @Output() readonly saved: EventEmitter<Array<User>> = new EventEmitter<Array<User>>();
  @Output() readonly close: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: UntypedFormGroup;
  formVisible: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserService
  ){

    console.log("Usuarios tarjeta", this.integrantesTarjeta)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Initialize the new list form
      this.form = this._formBuilder.group({
          integrantes: []
      });

      this.form.patchValue({
        integrantes:this.integrantesLista
      })
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Save
   */
  save(): void
  {
      // Get the new list title
      const integrantes = this.form.get('integrantes').value;

      // Return, if the title is empty
      if ( !integrantes || integrantes.length <= 0  )
      {
          return;
      }

      // Execute the observable
      this.saved.next(integrantes);
      // Clear the new list title and hide the form
      this.formVisible = false;
      this.form.get('integrantes').setValue([]);
      // Mark for check
      this._changeDetectorRef.markForCheck();
  }

  capareWithUser (option: User, value: User): boolean{
    
    return option?._id === value?._id
  }
}
