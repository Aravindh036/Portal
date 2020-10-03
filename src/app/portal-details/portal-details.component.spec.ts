import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDetailsComponent } from './portal-details.component';

describe('PortalDetailsComponent', () => {
  let component: PortalDetailsComponent;
  let fixture: ComponentFixture<PortalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
