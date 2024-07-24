import { Routes } from '@angular/router';
import { HomeComponent } from './domains/documents/pages/home/home.component';
import { SearchByNameComponent } from './domains/documents/pages/search/search-by-name/search-by-name.component';
import { SearchByTypeComponent } from './domains/documents/pages/search/search-by-type/search-by-type.component';
import { SearchDailyNotebooksComponent } from './domains/documents/pages/search/search-daily-notebooks/search-daily-notebooks.component';
import { SearchMarriageLicensesComponent } from './domains/documents/pages/search/search-marriage-licenses/search-marriage-licenses.component';
import { SearchByBookAndPageComponent } from './domains/documents/pages/search/search-by-book-and-page/search-by-book-and-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/name', component: SearchByNameComponent },
  { path: 'search/type', component: SearchByTypeComponent },
  { path: 'search/dailyNotebooks', component: SearchDailyNotebooksComponent },
  { path: 'search/marriageLicenses', component: SearchMarriageLicensesComponent },
  { path: 'search/bookAndPage', component: SearchByBookAndPageComponent },
];
