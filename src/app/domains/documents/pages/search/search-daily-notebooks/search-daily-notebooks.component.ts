import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebooksService } from '../../../../../notebooks.service';
import { searchImports } from '../search.declarations';

@Component({
  selector: 'app-search-daily-notebooks',
  standalone: true,
  imports: [ CommonModule, searchImports ],
  templateUrl: './search-daily-notebooks.component.html',
  styleUrls: ['./search-daily-notebooks.component.css'],
})
export class SearchDailyNotebooksComponent {
  title = 'Search Daily Notebooks';

  @Input() notebooks: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading: boolean = false;
  count?: number;
  constructor(private notebooksService: NotebooksService) {}

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
