import { Component, Input } from '@angular/core';
import { CheckLiveComponent } from "../../../shared/components/check-live/check-live.component";
import { DocumentTableComponent } from "../../components/document-table/document-table.component";
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CheckLiveComponent,
    DocumentTableComponent,
    MatTableModule,
    MatProgressBarModule,
  ],
  templateUrl: './search.component.html',
  // styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) notebooks: any[] = [];
  @Input({ required: true }) loading: boolean = false;
  @Input({ required: true }) noResultsFound: boolean = false;
  @Input({ required: true }) displayedColumns: string[] = [];
}
