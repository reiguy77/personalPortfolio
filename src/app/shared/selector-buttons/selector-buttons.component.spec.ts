import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorButtonsComponent } from './selector-buttons.component';

describe('SelectorButtonsComponent', () => {
  let component: SelectorButtonsComponent;
  let fixture: ComponentFixture<SelectorButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
