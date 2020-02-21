import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    ToolbarComponent,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class SharedModule { }
