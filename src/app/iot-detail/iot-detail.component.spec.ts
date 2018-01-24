import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotDetailComponent } from './iot-detail.component';

describe('IotDetailComponent', () => {
  let component: IotDetailComponent;
  let fixture: ComponentFixture<IotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
