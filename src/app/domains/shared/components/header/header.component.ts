import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTabsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  links = [
    { path: '', label: 'Home' },
    { path: 'search/dailyNotebooks', label: 'Daily Notebooks' },
    { path: 'search/name', label: 'Search by Name' },
    { path: 'search/type', label: 'Search by Type' },
    { path: 'search/marriageLicenses', label: 'Search Marriage Licenses' },
    { path: 'search/bookAndPage', label: 'Search by Book and Page' },
  ];
  activeLink = this.links[0];
}
