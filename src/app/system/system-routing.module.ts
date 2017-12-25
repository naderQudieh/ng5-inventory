import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from "./system.component";
import {PrintersPageComponent} from "./printers-page/printers-page.component";
import {ComputersPageComponent} from "./computers-page/computers-page.component";
import {AuthGuard} from "../shared/auth.guard";
import {DepartmentsPageComponent} from "./departments-page/departments-page.component";

const routes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
    // path: '', component: SystemComponent, children: [
      { path: '', redirectTo: 'computers', pathMatch: 'full' },
    {path: 'computers', component: ComputersPageComponent},
    // {path: 'laptops', component: NotebooksPageComponent},
    // {path: 'mat-computers', component: MatComputersPageComponent},
    {path: 'printers', component: PrintersPageComponent},
    {path: 'departments', component: DepartmentsPageComponent},
    // {path: 'add-item', component: AddItemComponent}
  ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
