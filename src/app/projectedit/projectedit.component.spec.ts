import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecteditComponent } from './projectedit.component';

describe('ProjecteditComponent', () => {
  let component: ProjecteditComponent;
  let fixture: ComponentFixture<ProjecteditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjecteditComponent]
    });
    fixture = TestBed.createComponent(ProjecteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
