import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ConcludedTaskComponent } from './concluded-task.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from 'src/app/services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ConcludedTaskComponent', () => {
  let component: ConcludedTaskComponent;
  let fixture: ComponentFixture<ConcludedTaskComponent>;
  let taskService: TaskService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConcludedTaskComponent],
      imports: [HttpClientModule],
      providers: [TaskService],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcludedTaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete', () => {
    const deleteTaskSpy = spyOn(component, 'deleteTask').and.callThrough();

    component.deleteTask();

    expect(deleteTaskSpy).toHaveBeenCalled();
  });

  it('Should after delete call updateList and updateChart', fakeAsync(() => {
    component.task.id = 'some-id';

    spyOn(taskService, 'deleteTask').and.returnValue(
      of({ title: '', description: '', dueDate: '' })
    );

    const deleteTaskSpy = spyOn(component, 'deleteTask').and.callThrough();
    const updateListSpy = spyOn(component, 'updateList');
    const updateChartSpy = spyOn(component, 'updateChart');

    component.deleteTask();

    tick();
    fixture.detectChanges();

    expect(deleteTaskSpy).toHaveBeenCalled();
    expect(updateListSpy).toHaveBeenCalled();
    expect(updateChartSpy).toHaveBeenCalled();
  }));

  it('Should dueDate has correct format', () => {
    component.task.dueDate = '2023-12-27';

    component.ngOnInit();

    expect(component.formatedDueDate).toBe('27/12/2023');
  });

  it('Should concluded date has correct format', () => {
    component.task.concludedAt = '2023-12-27';

    component.ngOnInit();

    expect(component.formatedConcludedDate).toBe('27/12/2023');
  });

  it('Should not dueDate has correct format', () => {
    component.task.dueDate = '';

    component.ngOnInit();

    expect(component.formatedDueDate).toBe('');
  });

  it('Should not concluded date has correct format', () => {
    component.task.concludedAt = '';

    component.ngOnInit();

    expect(component.formatedConcludedDate).toBe('');
  });

  it('Should navigate correctly', () => {
    spyOn(router, 'navigate');
    component.task.id = '123';

    component.openTask();

    expect(router.navigate).toHaveBeenCalledWith(['/details/123']);
  });
});
