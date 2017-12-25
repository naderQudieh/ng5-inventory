import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartmentsService} from "../shared/services/departments.service";
import {Department} from "../../shared/models/department.model";
import {Subscription} from "rxjs/Subscription";
import {DeleteDepartmentDialogComponent} from "./dialogs/delete-department-dialog/delete-department-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {CommonSnackbarComponent} from "../shared/snackbars/common-snackbar/common-snackbar.component";
import {EditDepartmentDialogComponent} from "./dialogs/edit-department-dialog/edit-department-dialog.component";

@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  departments: Department[] = [];

  currentDepartment: Department;
  editKey = '';
  message = '';

  s1: Subscription;

  constructor(private departmentsService: DepartmentsService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.s1 = this.departmentsService.getDepartments()
      .subscribe((departments) => {
          this.departments = departments;
          this.isLoaded = true;
      })
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }


    openDeleteDialog(department: any): void {
        this.reset();
        if (department) {
            this.editKey = department.$key;
            this.currentDepartment = Object.assign({}, department);
        }

        let dialogRef = this.dialog.open(DeleteDepartmentDialogComponent, {
            width: '450px',
            disableClose: false,
            data: { name: this.currentDepartment.name}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.confirmDelete();
                this.openSnackBar('Department deleted successfully');
            }
        });
    }


    openSnackBar(message: string) {
        this.snackBar.openFromComponent(CommonSnackbarComponent, {
            duration: 2000,
            data: {message: message}
        });
    }




  reset() {
    this.editKey = '';
    this.currentDepartment = null;
  }

    confirmDelete() {
        this.departmentsService.deleteDepartment(this.editKey);
        this.reset();
    }


    openEditDialog(department: any): void {
        this.reset();
        // edit mode
        if (department) {
            this.editKey = department.$key;
            this.currentDepartment = Object.assign({}, department);

            let dialogRef = this.dialog.open(EditDepartmentDialogComponent, {
                width: '600px',
                disableClose: false,
                data: {department: this.currentDepartment, editMode: 'edit'}
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.save();
                    this.openSnackBar('Changes saved successfully');
                } else {
                    this.reset();
                }
            });
// add mode
        } else {
            this.currentDepartment = new Department('');

            let dialogRef = this.dialog.open(EditDepartmentDialogComponent, {
                width: '600px',
                disableClose: false,
                data: {department: this.currentDepartment, editMode: 'add'}
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.add();
                    this.openSnackBar('Department added successfully')
                } else {
                    this.reset();
                }
            });
        }
    }


    save() {
        this.departmentsService.updateDepartment(this.editKey, this.currentDepartment);
        this.editKey = '';

    }

    add() {
        this.departmentsService.addDepartment(this.currentDepartment);
        this.editKey = '';
    }


}
