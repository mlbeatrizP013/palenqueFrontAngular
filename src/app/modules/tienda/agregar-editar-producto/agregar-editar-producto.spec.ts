import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarProducto } from './agregar-editar-producto';

describe('AgregarEditarProducto', () => {
  let component: AgregarEditarProducto;
  let fixture: ComponentFixture<AgregarEditarProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
