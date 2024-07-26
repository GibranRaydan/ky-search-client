import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDailyDocumentsComponent } from './search-daily-documents.component';

describe('SearchDailyDocumentsComponent', () => {
  let component: SearchDailyDocumentsComponent;
  let fixture: ComponentFixture<SearchDailyDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDailyDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDailyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
