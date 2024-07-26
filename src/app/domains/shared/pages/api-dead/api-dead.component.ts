import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-api-dead',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './api-dead.component.html',
  styleUrl: './api-dead.component.css',
})
export class ApiDeadComponent {
  reloadPage() {
    window.location.reload();
  }
}
