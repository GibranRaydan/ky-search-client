import { Component, Input } from '@angular/core';
import { CheckLiveComponent } from "../../../shared/components/check-live/check-live.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CheckLiveComponent],
  templateUrl: './search.component.html',
  // styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input({required: true}) title: string = '';

}
