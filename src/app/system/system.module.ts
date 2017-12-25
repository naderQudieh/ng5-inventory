import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import { PrintersPageComponent } from './printers-page/printers-page.component';
import { ComputersPageComponent } from './computers-page/computers-page.component';
import {ComputersService} from './shared/services/computers.service';
import {FilterPipe} from "./shared/pipes/filter.pipe";
import {DepartmentsService} from "./shared/services/departments.service";
import { DepartmentsPageComponent } from './departments-page/departments-page.component';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from "@angular/material";
import { DeleteDialogComponent } from './computers-page/dialogs/delete-dialog/delete-dialog.component';
import { EditComputerDialogComponent } from './computers-page/dialogs/edit-computer-dialog/edit-computer-dialog.component';
import { CommonSnackbarComponent } from './shared/snackbars/common-snackbar/common-snackbar.component';
import { DeleteDepartmentDialogComponent } from './departments-page/dialogs/delete-department-dialog/delete-department-dialog.component';
import { EditDepartmentDialogComponent } from './departments-page/dialogs/edit-department-dialog/edit-department-dialog.component';
import {PrintersService} from "./shared/services/printers.service";
import { EditPrinterDialogComponent } from './printers-page/dialogs/edit-printer-dialog/edit-printer-dialog.component';
import { DeletePrinterDialogComponent } from './printers-page/dialogs/delete-printer-dialog/delete-printer-dialog.component';

@NgModule({
  declarations: [
    SystemComponent,
    PrintersPageComponent,
    ComputersPageComponent,
    FilterPipe,
    DepartmentsPageComponent,
    DeleteDialogComponent,
    EditComputerDialogComponent,
    CommonSnackbarComponent,
    DeleteDepartmentDialogComponent,
    EditDepartmentDialogComponent,
    EditPrinterDialogComponent,
    DeletePrinterDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  entryComponents: [
      SystemComponent,
      DeleteDialogComponent,
      DeleteDepartmentDialogComponent,
      CommonSnackbarComponent,
      EditComputerDialogComponent,
      EditDepartmentDialogComponent,
      EditPrinterDialogComponent,
      DeletePrinterDialogComponent
  ],
  providers: [ComputersService, DepartmentsService, PrintersService]
})
export class SystemModule {

}
