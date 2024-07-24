import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMarriageLicensesComponent } from './search-marriage-licenses.component';

describe('SearchMarriageLicensesComponent', () => {
  let component: SearchMarriageLicensesComponent;
  let fixture: ComponentFixture<SearchMarriageLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMarriageLicensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMarriageLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
