import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarCodigoComponent } from './gerar-codigo.component';

describe('GerarCodigoComponent', () => {
  let component: GerarCodigoComponent;
  let fixture: ComponentFixture<GerarCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarCodigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
