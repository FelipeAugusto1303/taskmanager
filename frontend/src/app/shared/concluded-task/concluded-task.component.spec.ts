import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcludedTaskComponent } from './concluded-task.component';

describe('ConcludedTaskComponent', () => {
  let component: ConcludedTaskComponent;
  let fixture: ComponentFixture<ConcludedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcludedTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcludedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
