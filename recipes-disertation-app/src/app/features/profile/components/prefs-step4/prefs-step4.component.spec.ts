import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsStep4Component } from './prefs-step4.component';

describe('PrefsStep4Component', () => {
  let component: PrefsStep4Component;
  let fixture: ComponentFixture<PrefsStep4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefsStep4Component]
    });
    fixture = TestBed.createComponent(PrefsStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
