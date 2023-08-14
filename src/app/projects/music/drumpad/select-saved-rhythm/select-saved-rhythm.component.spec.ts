import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSavedRhythmComponent } from './select-saved-rhythm.component';

describe('SelectSavedRhythmComponent', () => {
  let component: SelectSavedRhythmComponent;
  let fixture: ComponentFixture<SelectSavedRhythmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSavedRhythmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSavedRhythmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
