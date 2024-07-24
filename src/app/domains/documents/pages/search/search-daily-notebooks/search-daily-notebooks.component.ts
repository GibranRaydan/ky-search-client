import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckLiveComponent } from '../../../../shared/components/check-live/check-live.component';
import { DocumentTableComponent } from '../../../components/document-table/document-table.component';
import { NotebooksService } from '../../../../../notebooks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-daily-notebooks',
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
    CheckLiveComponent,
    DocumentTableComponent,
    FormsModule,
  ],
  templateUrl: './search-daily-notebooks.component.html',
  styleUrls: ['./search-daily-notebooks.component.css'],
})
export class SearchDailyNotebooksComponent {

  @Input() notebooks: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading: boolean = false;
  count?: number;
  constructor(
    private notebooksService: NotebooksService,
    private snackBar: MatSnackBar
  ) {}

  loadNotebooks(): void {
    console.log('loadNotebooks');
    if (this.count !== undefined && (this.count <= 0 || this.count > 10000)) {
      console.warn('Count must be between 1 and 10000.');
      return;
    }

    const countValue =
      this.count && this.count > 0 && this.count <= 10000 ? this.count : 500;

    this.loading = true;
    this.notebooksService.getNotebooks(countValue).subscribe(
      (data) => {
        this.notebooks = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching notebooks', error);
        this.loading = false;
      }
    );
  }
}
