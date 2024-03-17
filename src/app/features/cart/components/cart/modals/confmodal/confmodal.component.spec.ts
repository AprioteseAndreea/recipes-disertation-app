import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfmodalComponent } from './confmodal.component';

describe('ConfmodalComponent', () => {
  let component: ConfmodalComponent;
  let fixture: ComponentFixture<ConfmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfmodalComponent]
    });
    fixture = TestBed.createComponent(ConfmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
