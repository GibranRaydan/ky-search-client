import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './domains/shared/components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    MatSnackBarModule,
    RouterOutlet,
  ],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'Notebook List';
  notebooks: any[] = [];
  loading = false;

  ngOnInit(): void {}
}
