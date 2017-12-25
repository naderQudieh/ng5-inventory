import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Supply} from "../../../../shared/models/supply.model";
import {Printer} from "../../../../shared/models/printer.model";

@Component({
  selector: 'app-edit-printer-dialog',
  templateUrl: './edit-printer-dialog.component.html',
  styleUrls: ['./edit-printer-dialog.component.scss']
})
export class EditPrinterDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<EditPrinterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(){ }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addSupply() {
        this.data.printer.supplies.push(new Supply('','',0));
    }

    deleteSupply(index: number) {
        this.data.printer.supplies.splice(index,1);
    }
}
