import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsStep2Component } from './prefs-step2.component';

describe('PrefsStep2Component', () => {
  let component: PrefsStep2Component;
  let fixture: ComponentFixture<PrefsStep2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefsStep2Component]
    });
    fixture = TestBed.createComponent(PrefsStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
