/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarraCelularTopoComponent } from './barra-celular-topo.component';

describe('BarraCelularTopoComponent', () => {
  let component: BarraCelularTopoComponent;
  let fixture: ComponentFixture<BarraCelularTopoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraCelularTopoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraCelularTopoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
