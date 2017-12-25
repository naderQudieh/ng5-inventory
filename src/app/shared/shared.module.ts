import { NgModule } from '@angular/core';

import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule ],
  declarations: [
    EChartsDirective,
    SlimScrollDirective,
  ],
  exports: [
    EChartsDirective,
    SlimScrollDirective,
      FormsModule,
      ReactiveFormsModule,
  ]
})

export class SharedModule {}
