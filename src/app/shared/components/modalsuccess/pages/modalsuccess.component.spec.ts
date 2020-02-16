import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsuccessComponent } from './modalsuccess.component';

describe('ModalsuccessComponent', () => {
  let component: ModalsuccessComponent;
  let fixture: ComponentFixture<ModalsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
