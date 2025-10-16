import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaList } from './asistencia-list';

describe('AsistenciaList', () => {
  let component: AsistenciaList;
  let fixture: ComponentFixture<AsistenciaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
