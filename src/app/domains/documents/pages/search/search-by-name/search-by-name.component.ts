import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { DocumentsService } from '../../../../../documents.service';
import { searchImports } from '../search.declarations';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    searchImports,
  ],
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css'],
})
export class SearchByNameComponent {
  title = 'Search By Name';

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
    nameType: new FormControl('GRANTOR', [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    given: new FormControl(null),
  });

  constructor(
    private documentsService: DocumentsService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm.get('nameType')?.valueChanges.subscribe((value) => {
      const givenControl = this.searchForm.get('given');
      if (value === 'BOTH') {
        givenControl?.setValidators(Validators.required);
      } else {
        givenControl?.clearValidators();
      }
      givenControl?.updateValueAndValidity();
    });
  }

  searchDocuments(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const { surname, nameType, given } = this.searchForm.value;

    this.loading = true;
    this.noResultsFound = false;
    this.documentsService
      .getDocumentsByName(surname, nameType, given)
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
