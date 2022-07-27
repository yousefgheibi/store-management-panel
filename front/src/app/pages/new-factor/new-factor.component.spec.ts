import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFactorComponent } from './new-factor.component';

describe('NewFactorComponent', () => {
  let component: NewFactorComponent;
  let fixture: ComponentFixture<NewFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
