import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './domains/shared/components/header/header.component';
import { ApiDeadComponent } from './domains/shared/pages/api-dead/api-dead.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ApiDeadComponent,
    MatSnackBarModule,
    RouterOutlet,
  ],
  template: `
    <app-header></app-header>
    @if(apiLiveStatus) {
    <router-outlet></router-outlet>
    } @else {
    <app-api-dead> </app-api-dead>
    }
  `,
})
export class AppComponent implements OnInit {
  title = 'Notebook List';

  apiLiveStatus: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.checkLive().subscribe(
      (data) => {},
      (error) => {
        console.error('Error checking live status:', error);
        this.router.navigate(['/']);
      }
    );
  }
}
