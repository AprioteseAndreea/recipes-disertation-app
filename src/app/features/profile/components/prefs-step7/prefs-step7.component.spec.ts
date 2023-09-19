import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsStep7Component } from './prefs-step7.component';

describe('PrefsStep7Component', () => {
  let component: PrefsStep7Component;
  let fixture: ComponentFixture<PrefsStep7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefsStep7Component]
    });
    fixture = TestBed.createComponent(PrefsStep7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
