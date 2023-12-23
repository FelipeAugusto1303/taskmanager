import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLogModalComponent } from './register-log-modal.component';

describe('RegisterLogModalComponent', () => {
  let component: RegisterLogModalComponent;
  let fixture: ComponentFixture<RegisterLogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLogModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
