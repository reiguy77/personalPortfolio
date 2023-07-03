import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyGoalResponseFormComponent } from './daily-goal-response-form.component';

describe('DailyGoalResponseFormComponent', () => {
  let component: DailyGoalResponseFormComponent;
  let fixture: ComponentFixture<DailyGoalResponseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyGoalResponseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyGoalResponseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
