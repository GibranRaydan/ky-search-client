// search-by-book-and-page.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DocumentsService } from '../../../../../documents.service';
import { searchImports } from '../search.declarations';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-by-book-and-page',
  standalone: true,
  imports: [
    CommonModule,
    searchImports,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-by-book-and-page.component.html',
  styleUrls: ['./search-by-book-and-page.component.css'],
})
export class SearchByBookAndPageComponent {
  title = 'Search By Book and Page';
  documents: any[] = [];
  loading: boolean = false;
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

  searchForm: FormGroup = new FormGroup({
    book: new FormControl(null, [
      Validators.required,
      Validators.min(1)]),
    page: new FormControl(null, [
      Validators.required,
      Validators.min(1)]),
  });

  constructor(
    private documentsService: DocumentsService,
    private snackBar: MatSnackBar
  ) {}

  searchDocuments(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const { book, page } = this.searchForm.value;

    this.loading = true;
    this.noResultsFound = false;
    this.documentsService.getDocumentsByBookAndPage(book, page).subscribe(
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
