import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestTemplateComponent } from './leave-request-template.component';

describe('LeaveRequestTemplateComponent', () => {
  let component: LeaveRequestTemplateComponent;
  let fixture: ComponentFixture<LeaveRequestTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRequestTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
