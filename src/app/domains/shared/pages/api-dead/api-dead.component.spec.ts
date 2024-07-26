import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDeadComponent } from './api-dead.component';

describe('ApiDeadComponent', () => {
  let component: ApiDeadComponent;
  let fixture: ComponentFixture<ApiDeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiDeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiDeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
