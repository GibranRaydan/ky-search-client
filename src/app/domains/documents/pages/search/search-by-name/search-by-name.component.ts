import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotebooksService } from '../../../../../notebooks.service';
import { searchImports } from '../search.declarations';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    searchImports,
  ],
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css'],
})
export class SearchByNameComponent {
  title = 'Search By Name';

  notebooks: any[] = [];
  loading: boolean = false;
  noResultsFound = false;
  searchForm: FormGroup;

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
    private fb: FormBuilder,
    private notebooksService: NotebooksService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      surname: ['', Validators.required],
      given: [''],
      nameType: ['GRANTOR', Validators.required],
    });

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
    this.notebooksService
      .getDocumentsByName(surname, nameType, given)
      .subscribe(
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
