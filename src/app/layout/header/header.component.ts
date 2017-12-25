import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'my-app-header',
  styles: [`
    mat-list-item:hover {
        background-color: #EEEEEE;
        cursor: pointer;
    }
  `],
  templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {
  public AppConfig: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.AppConfig = APPCONFIG;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
