import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericProfileComponent } from './generic-profile.component';

describe('GenericProfileComponent', () => {
  let component: GenericProfileComponent;
  let fixture: ComponentFixture<GenericProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
