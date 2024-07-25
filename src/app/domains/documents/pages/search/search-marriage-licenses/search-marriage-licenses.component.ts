import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DocumentsService } from '../../../../../documents.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { searchImports } from '../search.declarations';

@Component({
  selector: 'app-search-marriage-licenses',
  standalone: true,
  imports: [CommonModule, searchImports, ReactiveFormsModule],
  templateUrl: './search-marriage-licenses.component.html',
  styleUrl: './search-marriage-licenses.component.css',
})
export class SearchMarriageLicensesComponent {
  title = 'Search Marriage Licenses';

  @Input() documents: any[] = [];
  @Input() loading: boolean = false;
  noResultsFound = false;

  columns = ['license', 'book', 'page', 'date', 'actions'];

  filter = signal<'GROOM' | 'BRIDE'>('GROOM');

  changeType() {
    let filterTemp = this.searchForm.value.searchType;
    this.filter.set(filterTemp);
  }

  searchForm: FormGroup = new FormGroup({
    searchType: new FormControl<'GROOM' | 'BRIDE'>('GROOM', [
      Validators.required,
    ]),
    surname: new FormControl('', [Validators.required]),
    order: new FormControl<0 | 1>(0, [Validators.required]),
  });

  displayedColumns = computed(() => {
    const filter = this.filter();
    if (filter === 'GROOM') {
      return ['groom-name', ...this.columns];
    } else {
      return ['bride-name', ...this.columns];
    }
  });

  constructor(
    private fb: FormBuilder,
    private documentsService: DocumentsService,
    private snackBar: MatSnackBar
  ) {}

  searchDocuments(): void {
    if (this.searchForm.invalid) {
      return;
    }
    const { searchType, surname, order } = this.searchForm.value;

    this.loading = true;
    this.noResultsFound = false;
    this.documentsService
      .getMarriageLicenses(searchType, surname, order)
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
