import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsStep3Component } from './prefs-step3.component';

describe('PrefsStep3Component', () => {
  let component: PrefsStep3Component;
  let fixture: ComponentFixture<PrefsStep3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefsStep3Component]
    });
    fixture = TestBed.createComponent(PrefsStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
