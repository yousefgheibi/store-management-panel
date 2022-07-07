import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAndSellComponent } from './buy-and-sell.component';

describe('BuyAndSellComponent', () => {
  let component: BuyAndSellComponent;
  let fixture: ComponentFixture<BuyAndSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyAndSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyAndSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
