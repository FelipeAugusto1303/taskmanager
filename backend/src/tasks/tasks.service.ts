import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tasks } from './entities/tasks.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

type TaskLog = {
  dia: string;
  total: number;
};

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
  ) {}

  async findAll() {
    return this.taskRepository.find();
  }

  async taskLog(): Promise<TaskLog[]> {
    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .select([
        "DATE_TRUNC('day', task.concludedAt) as day",
        'COUNT(*) as total_hours',
      ])
      .where('task.concluded = :concluded', { concluded: true })
      .groupBy('day')
      .orderBy('day', 'ASC');
    return queryBuilder.getRawMany();
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new HttpException(`Task id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async create(createTaskDTO: CreateTaskDTO) {
    const task = this.taskRepository.create(createTaskDTO);

    return this.taskRepository.save(task);
  }

  async update(id: string, updateTaskDTO: UpdateTaskDTO) {
    const task = await this.taskRepository.preload({
      ...updateTaskDTO,
      id,
    });
    if (!task) {
      throw new HttpException(`Task id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new HttpException(`Task id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.taskRepository.remove(task);
  }
}
