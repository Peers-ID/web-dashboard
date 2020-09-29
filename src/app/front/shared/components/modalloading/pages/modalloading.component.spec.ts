import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalloadingComponent } from './modalloading.component';

describe('ModalloadingComponent', () => {
  let component: ModalloadingComponent;
  let fixture: ComponentFixture<ModalloadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalloadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
