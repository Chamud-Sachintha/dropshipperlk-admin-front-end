import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutLogComponent } from './payout-log.component';

describe('PayoutLogComponent', () => {
  let component: PayoutLogComponent;
  let fixture: ComponentFixture<PayoutLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayoutLogComponent]
    });
    fixture = TestBed.createComponent(PayoutLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
