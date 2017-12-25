import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-common-snackbar',
  templateUrl: './common-snackbar.component.html',
  styleUrls: ['./common-snackbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommonSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
