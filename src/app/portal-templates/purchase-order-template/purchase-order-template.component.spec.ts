import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderTemplateComponent } from './purchase-order-template.component';

describe('PurchaseOrderTemplateComponent', () => {
  let component: PurchaseOrderTemplateComponent;
  let fixture: ComponentFixture<PurchaseOrderTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
