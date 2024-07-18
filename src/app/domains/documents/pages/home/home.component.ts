import { Component, signal } from '@angular/core';

import { FaqsComponent } from './components/faqs/faqs.component'
import { Faq } from './models/faq.model';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [ FaqsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchOptions = [
    { label: 'Search by Name', id: 'name' },
    { label: 'Search by Book and Page', id: 'bookAndPage' },
    { label: 'Search by Instrument Type', id: 'instrument' },
    { label: 'View Daily Notebook', id: 'dailyNotebook' },
    { label: 'Search Marriage Licenses', id: 'marriageLicenses' },
  ];
}
