import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentTableComponent } from './../../components/document-table/document-table.component';
import { NotebooksService } from '../../../../notebooks.service';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    DocumentTableComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css'],
})
export class SearchByNameComponent {
  notebooks: any[] = [];
  displayedColumns: string[] = [];
  loading: boolean = false;
  noResultsFound = false;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notebooksService: NotebooksService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      surname: ['', Validators.required],
      given: [''],
      nameType: ['GRANTOR', Validators.required]
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
    this.notebooksService.getDocumentsByName(surname, nameType, given).subscribe(
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
