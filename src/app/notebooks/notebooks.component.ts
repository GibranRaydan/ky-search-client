import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-notebooks-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.css']
})
export class NotebooksTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() notebooks: any[] = [];
  @Input() loading: boolean = false;
  displayedColumns: string[] = ['grantor', 'grantee', 'kind', 'book', 'page', 'date'];

  dataSource = new MatTableDataSource<any>(this.notebooks);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.data = this.notebooks;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notebooks']) {
      this.dataSource.data = this.notebooks;
    }
  }
}
