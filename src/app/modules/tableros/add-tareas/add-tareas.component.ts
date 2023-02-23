import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-tareas',
  templateUrl: './add-tareas.component.html',
  styleUrls: ['./add-tareas.component.scss']
})
export class AddTareasComponent implements OnInit{

  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('titleAutosize') titleAutosize: CdkTextareaAutosize;
  @Input() buttonTitle: string = 'Añadir Tarea';
  @Output() readonly saved: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly close: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: UntypedFormGroup;
  formVisible: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder
  ){}

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

  /**
     * Toggle the visibility of the form
     */
  toggleFormVisibility(): void
  {
      // Toggle the visibility
      this.formVisible = !this.formVisible;

      // If the form becomes visible, focus on the title field
      if ( this.formVisible )
      {
          this.titleInput.nativeElement.focus();
      }
  }
}
