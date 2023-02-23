import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'app/shared/shared.module';
import { SelectorEmpresaComponent } from './selector-empresa.component'

@NgModule({
  declarations: [
    SelectorEmpresaComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SharedModule
  ],
  exports: [
    SelectorEmpresaComponent
  ]
})
export class SelectorEmpresaModule { }
