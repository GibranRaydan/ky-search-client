import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsService } from '../../../../../documents.service';
import { searchImports } from '../search.declarations';

@Component({
  selector: 'app-search-daily-documents',
  standalone: true,
  imports: [CommonModule, searchImports],
  templateUrl: './search-daily-documents.component.html',
  styleUrls: ['./search-daily-documents.component.css'],
})
export class SearchDailyDocumentsComponent {
  title = 'Search Daily Documents';

  @Input() documents: any[] = [];
  @Input() loading: boolean = false;
  count?: number;

  displayedColumns = [
    'grantor',
    'grantee',
    'kind',
    'book',
    'page',
    'date',
    'actions',
  ];

  constructor(private documentsService: DocumentsService) {}

  loadDocuments(): void {
    console.log('loadDocuments');
    if (this.count !== undefined && (this.count <= 0 || this.count > 10000)) {
      console.warn('Count must be between 1 and 10000.');
      return;
    }

    const countValue =
      this.count && this.count > 0 && this.count <= 10000 ? this.count : 500;

    this.loading = true;
    this.documentsService.getDocuments(countValue).subscribe(
      (data) => {
        this.documents = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching documents', error);
        this.loading = false;
      }
    );
  }
}
