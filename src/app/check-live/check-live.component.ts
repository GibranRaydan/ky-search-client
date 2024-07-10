import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-check-live',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-live.component.html',
  styleUrls: ['./check-live.component.css'],
  providers: [ApiService]
})
export class CheckLiveComponent implements OnInit {

  liveStatus: any;
  errorMessage: string | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.checkLive().subscribe(
      data => {
        this.liveStatus = data;
        this.errorMessage = undefined; // Clear any previous error message
      },
      error => {
        this.errorMessage = error; // Store the error message for display
        console.error('Error checking live status:', error);
      }
    );
  }
}
