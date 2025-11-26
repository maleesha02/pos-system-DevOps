import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerPageComponent } from './dashboard-customer-page.component';

describe('DashboardCustomerPageComponent', () => {
  let component: DashboardCustomerPageComponent;
  let fixture: ComponentFixture<DashboardCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCustomerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
