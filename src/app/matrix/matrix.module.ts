import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { MatrixComponent } from './matrix.component';

// Modules
import { MatrixRoutingModule } from './matrix-routing.module';
import { ToolbarMatrixComponent } from './toolbar-matrix/toolbar-matrix.component';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    MatrixComponent,
    ToolbarMatrixComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatrixRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class MatrixModule { }
