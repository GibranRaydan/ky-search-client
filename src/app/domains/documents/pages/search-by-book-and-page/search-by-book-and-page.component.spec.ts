import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByBookAndPageComponent } from './search-by-book-and-page.component';

describe('SearchByBookAndPageComponent', () => {
  let component: SearchByBookAndPageComponent;
  let fixture: ComponentFixture<SearchByBookAndPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByBookAndPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByBookAndPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
