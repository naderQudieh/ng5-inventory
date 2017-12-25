import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import {SystemComponent} from "../system/system.component";
import {AuthGuard} from "../shared/auth.guard";

const routes: Routes = [
  {
    path: 'app', component: LayoutComponent, children: [
      { path: '', redirectTo: 'system', pathMatch: 'full' },
      { path: 'system', loadChildren: '../system/system.module#SystemModule'}
    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
