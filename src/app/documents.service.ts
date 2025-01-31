import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { throwError, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private apiUrl = environment.apiUrl; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getDocuments(count: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/documents/daily?count=${count}`).pipe(
      catchError(this.handleError)
    );
  }

  getDocumentsByName(surname: string, nameType: string, given: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/documents/name`, {
      params: { surname, nameType, given },
    }).pipe(
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

  getMarriageLicenses(searchType: 'GROOM' | 'BRIDE', surname: string, order: 0|1): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/search/documents/marriage-license`, {
        params: { surname, searchType, order },
      })
      .pipe(catchError(this.handleError));
  }

  getPdfDocument(book: number, page: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/search/documents/pdf`, {
       //params: { book: '2170', page:'1' },
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
