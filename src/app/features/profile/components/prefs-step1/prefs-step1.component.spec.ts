import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsStep1Component } from './prefs-step1.component';

describe('PrefsStep1Component', () => {
  let component: PrefsStep1Component;
  let fixture: ComponentFixture<PrefsStep1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefsStep1Component]
    });
    fixture = TestBed.createComponent(PrefsStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
