import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductPageComponent } from './dashboard-product-page.component';

describe('DashboardProductPageComponent', () => {
  let component: DashboardProductPageComponent;
  let fixture: ComponentFixture<DashboardProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProductPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
