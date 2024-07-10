import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-notebooks-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.css']
})
export class NotebooksTableComponent {
  @Input() notebooks: any[] = [];
  @Input() loading: boolean = false;
  displayedColumns: string[] = ['grantor', 'grantee', 'kind', 'book', 'page', 'date']; // Add more column names as needed
  //displayedColumns: string[] = [
  //  'image', 'filler', 'code', 'grantorA', 'grantor', 'grantorGiven1',
  //  'grantorGiven2', 'gorAp', 'granteeA', 'grantee', 'granteeGiven1',
  //  'granteeGiven2', 'geeAP', 'kind', 'book', 'page', 'numberPages',
  //  'lastPage', 'desc', 'docNo', 'date', 'time', 'alt', 'blank', 'money',
  //  'idX1', 'idX2', 'idX3', 'idX4', 'idX5', 'idX6', 'idX7', 'idX8', 'idX9',
  //  'idX10', 'recordChanged', 'refKind', 'refBook', 'refPage', 'isRefParent',
  //  'isORFirstParty', 'isEEFirstParty', 'grantorStripped', 'grantorGiven1Stripped',
  //  'grantorGiven2Stripped', 'granteeStripped', 'granteeGiven1Stripped',
  //  'granteeGiven2Stripped', 'primKey', 'docNumber'
  //];
}
