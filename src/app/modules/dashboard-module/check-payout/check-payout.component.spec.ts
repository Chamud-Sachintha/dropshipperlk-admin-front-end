import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPayoutComponent } from './check-payout.component';

describe('CheckPayoutComponent', () => {
  let component: CheckPayoutComponent;
  let fixture: ComponentFixture<CheckPayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckPayoutComponent]
    });
    fixture = TestBed.createComponent(CheckPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
