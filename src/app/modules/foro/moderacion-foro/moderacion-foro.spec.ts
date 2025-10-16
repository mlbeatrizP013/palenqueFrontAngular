import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeracionForo } from './moderacion-foro';

describe('ModeracionForo', () => {
  let component: ModeracionForo;
  let fixture: ComponentFixture<ModeracionForo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeracionForo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeracionForo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
