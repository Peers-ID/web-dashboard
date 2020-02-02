import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalconfigComponent } from './approvalconfig.component';

describe('ApprovalconfigComponent', () => {
  let component: ApprovalconfigComponent;
  let fixture: ComponentFixture<ApprovalconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
