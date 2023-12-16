import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKycComponent } from './manage-kyc.component';

describe('ManageKycComponent', () => {
  let component: ManageKycComponent;
  let fixture: ComponentFixture<ManageKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageKycComponent]
    });
    fixture = TestBed.createComponent(ManageKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
