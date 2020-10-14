import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryTemplateComponent } from './inquiry-template.component';

describe('InquiryTemplateComponent', () => {
  let component: InquiryTemplateComponent;
  let fixture: ComponentFixture<InquiryTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
