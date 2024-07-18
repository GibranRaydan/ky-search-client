import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLiveComponent } from './check-live.component';

describe('CheckLiveComponent', () => {
  let component: CheckLiveComponent;
  let fixture: ComponentFixture<CheckLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckLiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
