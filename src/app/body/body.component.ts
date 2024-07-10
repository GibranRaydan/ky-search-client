import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CheckLiveComponent } from '../check-live/check-live.component';
import { NotebooksTableComponent } from '../notebooks/notebooks.component';
import { NotebooksService } from '../notebooks.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CheckLiveComponent,
    NotebooksTableComponent
  ],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  @Input() notebooks: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading: boolean = false;

  constructor(private notebooksService: NotebooksService) { }
  ngOnInit(): void {}

  loadNotebooks(): void {
    this.loading = true;
    this.notebooksService.getNotebooks().subscribe(data => {
      this.notebooks = data;
      this.loading = false;
    }, error => {
      console.error('Error fetching notebooks', error);
      this.loading = false;
    });
  }
}
