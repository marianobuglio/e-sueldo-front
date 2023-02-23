import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize, Subscription, tap } from 'rxjs';
import { FileUploadService } from './services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input()
    requiredFileType:string;
    files:Array<File>
  @Output() url = new EventEmitter<string>();
    uploadProgress:number;
    uploadSub: Subscription;

  constructor(
    private _uploadFileService: FileUploadService,
  ){}

  onFileSelected(event) {
     this.files  = event.target.files;
  
    if (this.files) {
        
        const formData = new FormData();
        formData.append("uploadedFile", this.files[0]);

        const upload$ = this._uploadFileService.upload(formData)
        .pipe(
          tap((response:any ) => { 
            if(response.body){
              this.url.emit(response.body.uploadedURL)
            }
              
          }),
          finalize(() => {this.reset()})
        );
      
        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        })
    }
}
cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  this.uploadProgress = null;
  this.uploadSub = null;
  console.log()
}
}
