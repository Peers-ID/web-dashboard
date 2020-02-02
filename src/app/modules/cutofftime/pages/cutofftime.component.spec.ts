import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutofftimeComponent } from './cutofftime.component';

describe('CutofftimeComponent', () => {
  let component: CutofftimeComponent;
  let fixture: ComponentFixture<CutofftimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutofftimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutofftimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
