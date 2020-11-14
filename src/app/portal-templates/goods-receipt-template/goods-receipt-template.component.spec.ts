import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptTemplateComponent } from './goods-receipt-template.component';

describe('GoodsReceiptTemplateComponent', () => {
  let component: GoodsReceiptTemplateComponent;
  let fixture: ComponentFixture<GoodsReceiptTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReceiptTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
