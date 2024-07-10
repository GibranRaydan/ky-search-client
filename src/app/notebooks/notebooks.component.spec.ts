import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebooksTableComponent } from './notebooks.component';

describe('NotebooksComponent', () => {
  let component: NotebooksTableComponent;
  let fixture: ComponentFixture<NotebooksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotebooksTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotebooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
