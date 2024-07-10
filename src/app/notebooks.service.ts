import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotebooksService {
  private apiUrl = 'https://localhost:7087/notebooks'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getNotebooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
