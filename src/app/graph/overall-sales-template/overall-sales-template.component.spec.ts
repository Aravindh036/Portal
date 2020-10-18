import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallSalesTemplateComponent } from './overall-sales-template.component';

describe('OverallSalesTemplateComponent', () => {
  let component: OverallSalesTemplateComponent;
  let fixture: ComponentFixture<OverallSalesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallSalesTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallSalesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
