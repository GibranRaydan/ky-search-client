import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  constructor(private notebooksService: NotebooksService) { }

  loadNotebooks(): void {
    if (this.count !== undefined && (this.count <= 0 || this.count > 1000)) {
      console.warn('Count must be between 1 and 1000.');
      return;
    }

    const countValue = this.count && this.count > 0 && this.count <= 1000 ? this.count : 500;

    this.loading = true;
    this.notebooksService.getNotebooks(countValue).subscribe(data => {
      this.notebooks = data;
      this.loading = false;
    }, error => {
      console.error('Error fetching notebooks', error);
      this.loading = false;
    });
  }
}
