import { Component } from '@angular/core';
import { SearchComponent } from "../search.component";

@Component({
  selector: 'app-search-marriage-licenses',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './search-marriage-licenses.component.html',
  styleUrl: './search-marriage-licenses.component.css'
})
export class SearchMarriageLicensesComponent {
  title = "Search Marriage Licenses";

}
