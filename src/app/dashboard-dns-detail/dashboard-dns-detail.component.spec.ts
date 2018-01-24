import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDnsDetailComponent } from './dashboard-dns-detail.component';

describe('DashboardDnsDetailComponent', () => {
  let component: DashboardDnsDetailComponent;
  let fixture: ComponentFixture<DashboardDnsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDnsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDnsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
