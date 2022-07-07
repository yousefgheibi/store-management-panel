import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAndExpensesComponent } from './income-and-expenses.component';

describe('IncomeAndExpensesComponent', () => {
  let component: IncomeAndExpensesComponent;
  let fixture: ComponentFixture<IncomeAndExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeAndExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeAndExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
