import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoperasiComponent } from './koperasi.component';

describe('KoperasiComponent', () => {
  let component: KoperasiComponent;
  let fixture: ComponentFixture<KoperasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoperasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoperasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
