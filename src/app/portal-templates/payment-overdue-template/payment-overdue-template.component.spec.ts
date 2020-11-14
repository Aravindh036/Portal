import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOverdueTemplateComponent } from './payment-overdue-template.component';

describe('PaymentOverdueTemplateComponent', () => {
  let component: PaymentOverdueTemplateComponent;
  let fixture: ComponentFixture<PaymentOverdueTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOverdueTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOverdueTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
