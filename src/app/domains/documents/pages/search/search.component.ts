import { Component, Input } from '@angular/core';
import { DocumentTableComponent } from "../../components/document-table/document-table.component";
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    DocumentTableComponent,
    MatTableModule,
    MatProgressBarModule,
  ],
  templateUrl: './search.component.html',
  // styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) documents: any[] = [];
  @Input({ required: true }) loading: boolean = false;
  @Input({ required: true }) noResultsFound: boolean = false;
  @Input({ required: true }) displayedColumns: string[] = [];
}
