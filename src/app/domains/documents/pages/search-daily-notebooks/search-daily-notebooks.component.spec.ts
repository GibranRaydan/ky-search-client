import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDailyNotebooksComponent } from './search-daily-notebooks.component';

describe('SearchDailyNotebooksComponent', () => {
  let component: SearchDailyNotebooksComponent;
  let fixture: ComponentFixture<SearchDailyNotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDailyNotebooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDailyNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
