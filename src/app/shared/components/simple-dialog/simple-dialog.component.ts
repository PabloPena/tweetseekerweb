import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: 'simple-dialog.component.html',
})
export class SimpleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}