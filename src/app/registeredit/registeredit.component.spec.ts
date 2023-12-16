import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistereditComponent } from './registeredit.component';

describe('RegistereditComponent', () => {
  let component: RegistereditComponent;
  let fixture: ComponentFixture<RegistereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistereditComponent]
    });
    fixture = TestBed.createComponent(RegistereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
