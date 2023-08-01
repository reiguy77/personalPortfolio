import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumpadComponent } from './drumpad.component';

describe('DrumpadComponent', () => {
  let component: DrumpadComponent;
  let fixture: ComponentFixture<DrumpadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrumpadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrumpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
