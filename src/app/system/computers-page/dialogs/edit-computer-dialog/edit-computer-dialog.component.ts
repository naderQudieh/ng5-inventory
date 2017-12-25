import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-computer-dialog',
  templateUrl: './edit-computer-dialog.component.html',
  styleUrls: ['./edit-computer-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditComputerDialogComponent implements OnInit {

  //date = new FormControl(new Date());

  constructor(
    public dialogRef: MatDialogRef<EditComputerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDate(warrantyDate: string): FormControl {
    return new FormControl(new Date(warrantyDate));
  }

}
