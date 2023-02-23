import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-lista-tareas',
  templateUrl: './add-lista-tareas.component.html',
  styleUrls: ['./add-lista-tareas.component.scss']
})
export class AddListaTareasComponent {
  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('titleAutosize') titleAutosize: CdkTextareaAutosize;
  @Input() buttonTitle: string = 'Añadir Tarjeta';
  @Output() readonly saved: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly close: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: UntypedFormGroup;
  formVisible: boolean = false;

  /**
   * Constructor
   */
  constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      private _formBuilder: UntypedFormBuilder
  )
  {
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
          title: ['']
      });
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
      const title = this.form.get('title').value;

      // Return, if the title is empty
      if ( !title || title.trim() === '' )
      {
          return;
      }

      // Execute the observable
      this.saved.next(title.trim());

      // Clear the new list title and hide the form
      this.formVisible = false;
      this.form.get('title').setValue('');

      // Reset the size of the textarea
      setTimeout(() => {
          this.titleInput.nativeElement.value = '';
          this.titleAutosize.reset();
      });

      // Mark for check
      this._changeDetectorRef.markForCheck();
  }

}
