import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from './pipes';
import { DirectivesModule } from './directives';
import { AppPageTitleComponent } from './components/app-page-title/app-page-title.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';

export const COMPONENTS = [
  AppPageTitleComponent, SimpleDialogComponent
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    DirectivesModule
  ],
  declarations: [COMPONENTS],
  entryComponents: [SimpleDialogComponent],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    DirectivesModule,
    COMPONENTS
  ],
})
export class SharedModule {
}