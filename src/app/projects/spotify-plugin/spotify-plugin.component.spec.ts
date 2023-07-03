import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPluginComponent } from './spotify-plugin.component';

describe('SpotifyPluginComponent', () => {
  let component: SpotifyPluginComponent;
  let fixture: ComponentFixture<SpotifyPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyPluginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
