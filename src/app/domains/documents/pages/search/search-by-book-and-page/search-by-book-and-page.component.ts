// search-by-book-and-page.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DocumentsService } from '../../../../../documents.service';
import { searchImports } from '../search.declarations';

@Component({
  selector: 'app-search-by-book-and-page',
  standalone: true,
  imports: [CommonModule, searchImports, MatSnackBarModule],
  templateUrl: './search-by-book-and-page.component.html',
  styleUrls: ['./search-by-book-and-page.component.css'],
})
export class SearchByBookAndPageComponent {
  title = 'Search By Book and Page';
  @Input() documents: any[] = [];
  @Input() loading: boolean = false;
  book?: number;
  page?: number;
  noResultsFound = false;

  displayedColumns = [
    'grantor',
    'grantee',
    'kind',
    'book',
    'page',
    'date',
    'actions',
  ];

  constructor(
    private documentsService: DocumentsService,
    private snackBar: MatSnackBar
  ) {}

  searchDocuments(): void {
    if (this.book === undefined || this.page === undefined) {
      console.warn('Book and page must be defined.');
      return;
    }

    this.loading = true;
    this.noResultsFound = false;
    this.documentsService
      .getDocumentsByBookAndPage(this.book, this.page)
      .subscribe(
        (data) => {
          if (data && Array.isArray(data) && data.length > 0) {
            this.documents = data;
          } else {
            this.documents = [];
            this.noResultsFound = true;
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching documents', error);
          this.snackBar.open(`Error fetching documents: ${error}`, 'Close', {
            duration: 3000,
          });
          this.loading = false;
        }
      );
  }
}
