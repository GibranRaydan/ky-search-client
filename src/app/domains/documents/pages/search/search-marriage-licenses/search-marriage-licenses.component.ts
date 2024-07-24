import { Component, Input } from '@angular/core';
import { SearchComponent } from "../search.component";

@Component({
  selector: 'app-search-marriage-licenses',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './search-marriage-licenses.component.html',
  styleUrl: './search-marriage-licenses.component.css',
})
export class SearchMarriageLicensesComponent {
  title = 'Search Marriage Licenses';

  @Input() notebooks: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading: boolean = false;

  // ascending or descending
  // BRIDE or GROOM
  // bride surname or gromm surname
}
