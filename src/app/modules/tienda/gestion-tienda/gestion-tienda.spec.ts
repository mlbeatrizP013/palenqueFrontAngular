import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTienda } from './gestion-tienda';

describe('GestionTienda', () => {
  let component: GestionTienda;
  let fixture: ComponentFixture<GestionTienda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTienda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTienda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
