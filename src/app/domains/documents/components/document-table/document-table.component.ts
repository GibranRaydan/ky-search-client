import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DocumentsService } from '../../../../documents.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-documents-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.css'],
})
export class DocumentTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() documents: any[] = [];
  @Input() loading: boolean = false;
  @Input() displayedColumns: string[] = [
    'grantor',
    'grantee',
    'kind',
    'book',
    'page',
    'date',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>(this.documents);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private documentsService: DocumentsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource.data = this.documents;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documents']) {
      this.dataSource.data = this.documents;
    }
  }

  downloadPdf(element: any) {
    this.documentsService.getPdfDocument(element.book, element.page).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Book${element.book}_Page${element.page}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading PDF', error);
        this.snackBar.open(`Error downloading PDF: ${error}`, 'Close', {
          duration: 3000,
        });
      }
    );
  }

  downloadTiff(element: any) {
    this.documentsService.getTifDocument(element.book, element.page).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Book${element.book}_Page${element.page}.tif`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading TIFF', error);
        this.snackBar.open(`Error downloading TIFF: ${error}`, 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
