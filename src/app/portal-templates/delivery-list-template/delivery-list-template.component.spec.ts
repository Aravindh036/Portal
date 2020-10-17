import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryListTemplateComponent } from './delivery-list-template.component';

describe('DeliveryListTemplateComponent', () => {
  let component: DeliveryListTemplateComponent;
  let fixture: ComponentFixture<DeliveryListTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryListTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
