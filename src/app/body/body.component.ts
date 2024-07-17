import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckLiveComponent } from '../check-live/check-live.component';
import { NotebooksTableComponent } from '../notebooks/notebooks.component';
import { NotebooksService } from '../notebooks.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-body',
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
    NotebooksTableComponent,
    FormsModule
  ],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  @Input() notebooks: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading: boolean = false;
  count?: number;
  constructor(
    private notebooksService: NotebooksService,
    private snackBar: MatSnackBar) { }

  loadNotebooks(): void {
    if (this.count !== undefined && (this.count <= 0 || this.count > 10000)) {
      console.warn('Count must be between 1 and 10000.');
      return;
    }

    const countValue = this.count && this.count > 0 && this.count <= 10000 ? this.count : 500;

    this.loading = true;
    this.notebooksService.getNotebooks(countValue).subscribe(data => {
      this.notebooks = data;
      this.loading = false;
    }, error => {
      console.error('Error fetching notebooks', error);
      this.loading = false;
    });
  }

  //downloadPdf(element: any): void {
  //  this.notebooksService.getPdfDocument(element.book, element.page).subscribe(response => {
  //    this.downloadFile(response, 'application/pdf');
  //  }, error => {
  //    this.snackBar.open(`Error downloading PDF: ${error}`, 'Close', { duration: 3000 });
  //  });
  //}

  //downloadTiff(element: any): void {
  //  this.notebooksService.getTifDocument(element.book, element.page).subscribe(response => {
  //    this.downloadFile(response, 'image/tiff');
  //  }, error => {
  //    this.snackBar.open(`Error downloading TIFF: ${error}`, 'Close', { duration: 3000 });
  //  });
  //}

  //private downloadFile(data: Blob, type: string): void {
  //  const blob = new Blob([data], { type });
  //  const url = window.URL.createObjectURL(blob);
  //  const link = document.createElement('a');
  //  link.href = url;
  //  link.download = `document.${type.split('/')[1]}`;
  //  link.click();
  //  window.URL.revokeObjectURL(url);
  //}
}
