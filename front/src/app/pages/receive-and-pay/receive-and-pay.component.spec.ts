import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveAndPayComponent } from './receive-and-pay.component';

describe('ReceiveAndPayComponent', () => {
  let component: ReceiveAndPayComponent;
  let fixture: ComponentFixture<ReceiveAndPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveAndPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveAndPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
