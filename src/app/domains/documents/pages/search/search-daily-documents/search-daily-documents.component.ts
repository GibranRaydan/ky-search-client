import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsService } from '../../../../../documents.service';
import { searchImports } from '../search.declarations';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search-daily-documents',
  standalone: true,
  imports: [CommonModule, searchImports, ReactiveFormsModule],
  templateUrl: './search-daily-documents.component.html',
  styleUrls: ['./search-daily-documents.component.css'],
})
export class SearchDailyDocumentsComponent {
  title = 'Search Daily Documents';

  documents: any[] = [];
  loading: boolean = false;

  searchForm: FormGroup = new FormGroup({
    count: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.min(1),
      Validators.max(10000)]),
  });

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
    if (this.searchForm.invalid) {
      return;
    }

    const { count } = this.searchForm.value;

    const countValue = count && count > 0 && count <= 10000 ? count : 500;

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
