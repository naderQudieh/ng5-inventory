import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ComputersService} from "../shared/services/computers.service";
import {Computer} from "../../shared/models/computer.model";
import {Subscription} from "rxjs/Subscription";
import {NgForm} from "@angular/forms";
import {Department} from "../../shared/models/department.model";
import {Observable} from "rxjs/Observable";
import {DepartmentsService} from "../shared/services/departments.service";
import {MatDialog, MatSnackBar, Sort} from "@angular/material";
import {DeleteDialogComponent} from "./dialogs/delete-dialog/delete-dialog.component";
import {EditComputerDialogComponent} from "./dialogs/edit-computer-dialog/edit-computer-dialog.component";
import {CommonSnackbarComponent} from "../shared/snackbars/common-snackbar/common-snackbar.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-computers-page',
  templateUrl: './computers-page.component.html',
  styleUrls: ['./computers-page.component.css'],
})
export class ComputersPageComponent implements OnInit, OnDestroy {

  computers: Computer[] = [];
  currentComputer: Computer;
  tempComputer: Computer;
  isLoaded = false;
  editKey = '';
  message = '';
  searchValue = '';
  departments: Department[] = [];
  s1: Subscription;
  sortedData: any;

  currentSortHeader = 'employeeName';
  currentSortDirection = 'asc';

  constructor(private computersService: ComputersService,
              private departmentsService: DepartmentsService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.computersService.getComputers(),
      this.departmentsService.getDepartments()
    ).subscribe((data: [Computer[], Department[]]) => {
      this.computers = data[0];
      this.departments = data[1];
      // this.sortedData = this.computers.slice();
        //=======================================================
        // sorting on init to keep sorting after data updates
        this.sortedData = this.computers.slice().sort((a, b) => {
            let isAsc = this.currentSortDirection === 'asc';
            switch (this.currentSortHeader) {
                case 'employeeName': return compare(a.employeeName, b.employeeName, isAsc);
                case 'department': return compare(a.department, b.department, isAsc);
                case 'location': return compare(a.location, b.location, isAsc);
                case 'type': return compare(a.type, b.type, isAsc);
                case 'warranty': return compare(new Date(a.warrantyUntil), new Date(b.warrantyUntil), isAsc);
                case 'inv_num': return compare(+a.inv_num, +b.inv_num, isAsc);
                default: return 0;
            }
        });
        //=======================================================
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

  // ============== SORT ================
  sortData(sort: Sort) {
    const data = this.computers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    // keeping current sort state to keep table sorted the same after data update
    this.currentSortHeader = sort.active;
    this.currentSortDirection = sort.direction;

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'employeeName': return compare(a.employeeName, b.employeeName, isAsc);
        case 'department': return compare(a.department, b.department, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'warranty': return compare(new Date(a.warrantyUntil), new Date(b.warrantyUntil), isAsc);
        case 'inv_num': return compare(+a.inv_num, +b.inv_num, isAsc);
        default: return 0;
      }
    });
  }
  // ====================================

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      duration: 2000,
      data: {message: message}
    });
  }

  openEditDialog(computer: any): void {
    this.reset();
    // edit mode
    if (computer) {
      this.editKey = computer.$key;
      this.currentComputer = Object.assign({}, computer);

      let dialogRef = this.dialog.open(EditComputerDialogComponent, {
        width: '600px',
        disableClose: false,
        data: {computer: this.currentComputer, departments: this.departments, editMode: 'edit'}
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        //  console.log('Form result: '+result);
        if (result) {
          this.save();
          this.openSnackBar('Changes saved successfully');
        } else {
          this.reset();
        }
      });
// add mode
    } else {
      this.currentComputer = Object.assign({},new Computer('', '', '', '', '', '', '', '', new Date().toDateString()));

      let dialogRef = this.dialog.open(EditComputerDialogComponent, {
        width: '600px',
        disableClose: false,
        data: {computer: this.currentComputer, departments: this.departments, editMode: 'add'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
             // converting material date to string otherwise Date object not adding to Firebase
            this.currentComputer.warrantyUntil = this.currentComputer.warrantyUntil.toString();
            this.add();
          this.openSnackBar('Computer added successfully')
        } else {
          this.reset();
        }
      });
    }
  }

  add() {
    this.computersService.addComputer(this.currentComputer);
    this.reset();
  }

  openDeleteDialog(computer: any): void {
    this.reset();
    if (computer) {
      this.editKey = computer.$key;
      this.currentComputer = Object.assign({}, computer);
    }

    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      disableClose: false,
      data: { name: this.currentComputer.employeeName}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      if (result) {
        this.confirmDelete();
        this.openSnackBar('Computer deleted successfully');
      }
    });
  }

  save() {
    this.computersService.updateComputer(this.editKey, this.currentComputer);
    this.reset();
  }

  reset() {
    this.editKey = '';
    this.currentComputer = null;
  }

  delete(computer: any) {
    this.reset();
    if (computer) {
      this.editKey = computer.$key;
      this.currentComputer = Object.assign({}, computer);
    }
  }

  confirmDelete() {
    this.computersService.deleteComputer(this.editKey);
    this.reset();
  }



  warrantyActive(warrantyDate: string): boolean {
    const date = new Date(warrantyDate);
    date.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    return date >= today;
  }

}


function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
