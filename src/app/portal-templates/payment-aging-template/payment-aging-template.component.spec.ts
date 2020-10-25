import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAgingTemplateComponent } from './payment-aging-template.component';

describe('PaymentAgingTemplateComponent', () => {
  let component: PaymentAgingTemplateComponent;
  let fixture: ComponentFixture<PaymentAgingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAgingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAgingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
