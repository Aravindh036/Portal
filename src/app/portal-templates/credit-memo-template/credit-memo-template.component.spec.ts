import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditMemoTemplateComponent } from './credit-memo-template.component';

describe('CreditMemoTemplateComponent', () => {
  let component: CreditMemoTemplateComponent;
  let fixture: ComponentFixture<CreditMemoTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditMemoTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditMemoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
