import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExperienciaComponent } from './experiencia.component';

describe('ExperienciasComponent', () => {
  let component: ExperienciaComponent;
  let fixture: ComponentFixture<ExperienciaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExperienciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
