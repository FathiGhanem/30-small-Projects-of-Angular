import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConatctFormComponent } from './conatct-form.component';

describe('ConatctFormComponent', () => {
  let component: ConatctFormComponent;
  let fixture: ComponentFixture<ConatctFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConatctFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConatctFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
