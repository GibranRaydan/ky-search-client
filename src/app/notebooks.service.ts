import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotebooksService {
  private apiUrl = 'https://localhost:7087'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getNotebooks(count: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notebooks?count=${count}`).pipe(
      catchError(this.handleError)
    );
  }

  getDocumentsByBookAndPage(book: number, page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/documents/book-page`, {
      params: { book, page },
    }).pipe(
      catchError(this.handleError)
    );
  }

  getDocumentsByType(kinds: string[]): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/documents/kind`, {
      params: { kinds },
    }).pipe(
      catchError(this.handleError)
    );
  }

  getPdfDocument(book: number, page: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/search/documents/pdf`, {
      // params: { book: '2170', page:'1' },
      params: { book, page },
      responseType: 'blob',
    }).pipe(
      catchError(this.handleError)
    );
  }

  getTifDocument(book: number, page: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/search/documents/tif`, {
      params: { book, page },
      responseType: 'blob',
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
