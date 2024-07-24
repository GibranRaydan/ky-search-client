// search-by-book-and-page.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { NotebooksService } from '../../../../../notebooks.service';
import { searchImports } from '../search.declarations';

@Component({
  selector: 'app-search-by-book-and-page',
  standalone: true,
  imports: [
    CommonModule,
    searchImports,
    MatSnackBarModule,
  ],
  templateUrl: './search-by-book-and-page.component.html',
  styleUrls: ['./search-by-book-and-page.component.css'],
})
export class SearchByBookAndPageComponent {
  title = 'Search By Book and Page';
  @Input() notebooks: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading: boolean = false;
  book?: number;
  page?: number;
  noResultsFound = false;

  constructor(
    private notebooksService: NotebooksService,
    private snackBar: MatSnackBar
  ) { }

  searchDocuments(): void {
    if (this.book === undefined || this.page === undefined) {
      console.warn('Book and page must be defined.');
      return;
    }

    this.loading = true;
    this.noResultsFound = false;
    this.notebooksService.getDocumentsByBookAndPage(this.book, this.page).subscribe(
      (data) => {

        if (data && Array.isArray(data) && data.length > 0) {
          this.notebooks = data;
        } else {
          this.notebooks = [];
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
