import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderTemplateComponent } from './sale-order-template.component';

describe('SaleOrderTemplateComponent', () => {
  let component: SaleOrderTemplateComponent;
  let fixture: ComponentFixture<SaleOrderTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleOrderTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
