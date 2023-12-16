import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprojectComponent } from './userproject.component';

describe('UserprojectComponent', () => {
  let component: UserprojectComponent;
  let fixture: ComponentFixture<UserprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserprojectComponent]
    });
    fixture = TestBed.createComponent(UserprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
