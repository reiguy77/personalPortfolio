import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeetcodePluginComponent } from './leetcode-plugin.component';

describe('LeetcodePluginComponent', () => {
  let component: LeetcodePluginComponent;
  let fixture: ComponentFixture<LeetcodePluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeetcodePluginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeetcodePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
