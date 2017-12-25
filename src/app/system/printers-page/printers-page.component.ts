import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PrintersService} from "../shared/services/printers.service";
import {Subscription} from "rxjs/Subscription";
import {Printer} from "../../shared/models/printer.model";
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {Supply} from "../../shared/models/supply.model";
import {CommonSnackbarComponent} from "../shared/snackbars/common-snackbar/common-snackbar.component";
import {EditPrinterDialogComponent} from "./dialogs/edit-printer-dialog/edit-printer-dialog.component";
import {DeletePrinterDialogComponent} from "./dialogs/delete-printer-dialog/delete-printer-dialog.component";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-printers-page',
  templateUrl: './printers-page.component.html',
  styleUrls: ['./printers-page.component.css']
})
export class PrintersPageComponent implements OnInit, OnDestroy {

    isLoaded = false;

    editFlag = false;
    currentKey: string = '';
    printers: Printer[] = [];
    s1: Subscription;
    currentPrinter: Printer;
    editKey = '';

    displayedColumns = ['printer', 'printerId', 'supplies', 'locations', 'actions'];
    suppliesColumns = ['productCode', 'supplyName', 'qty'];
    dataSource;

    @ViewChild(MatSort) sort: MatSort;

  constructor(private printersService: PrintersService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

    // ngAfterViewInit() {
    //   // setTimeout( ()=> {
    //   //     this.dataSource.sort = this.sort;
    //   // },2000);
    //     this.dataSource.sort = this.sort;
    // }


  ngOnInit() {
    this.s1 = this.printersService.getPrinters()
        .subscribe( (data) => {
          this.printers = data;
          this.dataSource = new MatTableDataSource(this.printers);
            this.dataSource.sort = this.sort;
          this.isLoaded = true;
        });
  }


  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    getPrinterSupplies(printer: Printer): MatTableDataSource<Supply> {
      return new MatTableDataSource(printer.supplies);
    }

    editQty(printer: any) {
      this.editFlag = true;
      this.currentKey = printer.$key;
      this.currentPrinter = Object.assign({}, printer);
    }

    save() {
        // console.log('Saving ' + supplies);
        // console.log('current printer = ', this.currentPrinter);
        this.printersService.updatePrinter(this.currentKey, this.currentPrinter);
        this.editFlag = false;
        this.currentKey = '111';
        this.currentPrinter = null;
    }


    openSnackBar(message: string) {
        this.snackBar.openFromComponent(CommonSnackbarComponent, {
            duration: 2000,
            data: {message: message}
        });
    }

    openEditDialog(printer: any): void {
        this.reset();
        // edit mode
        if (printer) {
            this.editKey = printer.$key;
            this.currentPrinter = Object.assign({}, printer);

            let dialogRef = this.dialog.open(EditPrinterDialogComponent, {
                width: '600px',
                disableClose: false,
                data: {printer: this.currentPrinter, editMode: 'edit'}
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.update();
                    this.openSnackBar('Changes saved successfully');
                } else {
                    this.reset();
                }
            });
// add mode
        } else {
            this.currentPrinter = Object.assign({},new Printer('','','',[new Supply('','',0)]));
            let dialogRef = this.dialog.open(EditPrinterDialogComponent, {
                width: '600px',
                disableClose: false,
                data: {printer: this.currentPrinter, editMode: 'add'}
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.add();
                    this.openSnackBar('Printer added successfully')
                } else {
                    this.reset();
                }
            });
        }
    }

    add() {
        this.printersService.addPrinter(this.currentPrinter);
        this.reset();
    }

    openDeleteDialog(printer: any): void {
        this.reset();
        if (printer) {
            this.editKey = printer.$key;
            this.currentPrinter = Object.assign({}, printer);
        }

        let dialogRef = this.dialog.open(DeletePrinterDialogComponent, {
            width: '450px',
            disableClose: false,
            data: { name: this.currentPrinter.name}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.printersService.deletePrinter(this.editKey);
                this.openSnackBar('Printer deleted successfully');
            }
        });
    }

    update() {
        this.printersService.updatePrinter(this.editKey, this.currentPrinter);
        this.reset();
    }

    reset() {
        this.editKey = '';
        this.currentPrinter = null;
    }


    // test() {
  //   this.currentPrinter = {
  //     name: 'HP LaserJet 1022N',
  //       printerId: 'C2312A',
  //       locations: 'T10A 3 floor',
  //       supplies: [
  //           {
  //             name: 'Black Toner',
  //               supplyId: 'CE2211',
  //               quantity: 1
  //           },
  //           {
  //               name: 'Fuse Kit',
  //               supplyId: 'CA7323',
  //               quantity: 0
  //           }
  //       ]
  //   };
  //
  //   this.printersService.addPrinter(this.currentPrinter);
  // }
  //
  //   test2() {
  //       this.currentPrinter = {
  //           name: 'RICOH Aficio 3224C',
  //           printerId: '3224C',
  //           locations: 'T10B 3 floor',
  //           supplies: [
  //               {
  //                   name: 'Black Toner',
  //                   supplyId: 'Black',
  //                   quantity: 0
  //               },
  //               {
  //                   name: 'Yellow Toner',
  //                   supplyId: 'Yellow',
  //                   quantity: 0
  //               },
  //               {
  //                   name: 'Cyan Toner',
  //                   supplyId: 'Cyan',
  //                   quantity: 0
  //               },
  //               {
  //                   name: 'Magenta Toner',
  //                   supplyId: 'Magenta',
  //                   quantity: 0
  //               }
  //           ]
  //       };
  //
  //       this.printersService.addPrinter(this.currentPrinter);
  //   }


}
