import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionhistoryPage } from './admissionhistory.page';

describe('AdmissionhistoryPage', () => {
  let component: AdmissionhistoryPage;
  let fixture: ComponentFixture<AdmissionhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
