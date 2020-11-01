import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTemplateComponent } from './quotation-template.component';

describe('QuotationTemplateComponent', () => {
  let component: QuotationTemplateComponent;
  let fixture: ComponentFixture<QuotationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
