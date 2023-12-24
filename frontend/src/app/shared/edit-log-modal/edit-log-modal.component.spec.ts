import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogModalComponent } from './edit-log-modal.component';

describe('EditLogModalComponent', () => {
  let component: EditLogModalComponent;
  let fixture: ComponentFixture<EditLogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLogModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
