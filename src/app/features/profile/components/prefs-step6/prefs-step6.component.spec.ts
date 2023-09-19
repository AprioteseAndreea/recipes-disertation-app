import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsStep6Component } from './prefs-step6.component';

describe('PrefsStep6Component', () => {
  let component: PrefsStep6Component;
  let fixture: ComponentFixture<PrefsStep6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefsStep6Component]
    });
    fixture = TestBed.createComponent(PrefsStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
