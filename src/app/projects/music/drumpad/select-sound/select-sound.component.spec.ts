import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSoundComponent } from './select-sound.component';

describe('SelectSoundComponent', () => {
  let component: SelectSoundComponent;
  let fixture: ComponentFixture<SelectSoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
