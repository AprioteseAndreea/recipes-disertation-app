import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsStep5Component } from './prefs-step5.component';

describe('PrefsStep5Component', () => {
  let component: PrefsStep5Component;
  let fixture: ComponentFixture<PrefsStep5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefsStep5Component]
    });
    fixture = TestBed.createComponent(PrefsStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
