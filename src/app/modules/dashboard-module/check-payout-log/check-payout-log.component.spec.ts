import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPayoutLogComponent } from './check-payout-log.component';

describe('CheckPayoutLogComponent', () => {
  let component: CheckPayoutLogComponent;
  let fixture: ComponentFixture<CheckPayoutLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckPayoutLogComponent]
    });
    fixture = TestBed.createComponent(CheckPayoutLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
