import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalstatusComponent } from './modalstatus.component';

describe('ModalstatusComponent', () => {
  let component: ModalstatusComponent;
  let fixture: ComponentFixture<ModalstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
