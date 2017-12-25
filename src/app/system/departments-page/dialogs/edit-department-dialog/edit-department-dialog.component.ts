import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-edit-department-dialog',
  templateUrl: './edit-department-dialog.component.html',
  styleUrls: ['./edit-department-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditDepartmentDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<EditDepartmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
