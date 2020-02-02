import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadformulaComponent } from './loadformula.component';

describe('LoadformulaComponent', () => {
  let component: LoadformulaComponent;
  let fixture: ComponentFixture<LoadformulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadformulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadformulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
