import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-delete-printer-dialog',
  templateUrl: './delete-printer-dialog.component.html',
  styleUrls: ['./delete-printer-dialog.component.scss']
})
export class DeletePrinterDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeletePrinterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
