import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperJourneyComponent } from './developer-journey.component';

describe('DeveloperJourneyComponent', () => {
  let component: DeveloperJourneyComponent;
  let fixture: ComponentFixture<DeveloperJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperJourneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
