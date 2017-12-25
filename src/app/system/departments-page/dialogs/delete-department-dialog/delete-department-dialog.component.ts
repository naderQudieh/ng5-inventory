import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-department-dialog',
  templateUrl: './delete-department-dialog.component.html',
  styleUrls: ['./delete-department-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteDepartmentDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteDepartmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
