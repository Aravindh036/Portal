import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPortalComponent } from './basic-portal.component';

describe('BasicPortalComponent', () => {
  let component: BasicPortalComponent;
  let fixture: ComponentFixture<BasicPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
