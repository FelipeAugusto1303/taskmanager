import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSpent } from './entities/timeSpent.entity';
import { Repository } from 'typeorm';
import { CreateTimeSpentDTO } from './dto/create-time-spent.dto';
import { UpdateTimeSpentDTO } from './dto/update-time-spent.dto';
import { Tasks } from 'src/tasks/entities/tasks.entity';

@Injectable()
export class TimeSpentService {
  constructor(
    @InjectRepository(TimeSpent)
    private readonly timeSpentRepository: Repository<TimeSpent>,
  ) {}

  async findAll() {
    return this.timeSpentRepository.find();
  }

  async findOne(id: string) {
    const timeSpent = await this.timeSpentRepository.findOne({
      where: { id },
    });
    if (!timeSpent) {
      throw new HttpException(`Task id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return timeSpent;
  }

  async findHours(id: string) {
    const queryBuilder = this.timeSpentRepository
      .createQueryBuilder('timeSpent')
      .select([
        'timeSpent.spentAt',
        'task.title',
        'SUM(timeSpent.timeSpent) as totalHours',
      ])
      .leftJoin(Tasks, 'task', 'timeSpent.taskId = task.id')
      .where('task.id = :taskId', { taskId: id })
      .groupBy('timeSpent.spentAt, task.title')
      .orderBy('timeSpent.spentAt', 'ASC');

    return queryBuilder.getRawMany();
  }

  async create(createTimeSpentDTO: CreateTimeSpentDTO) {
    const timeSpent = this.timeSpentRepository.create(createTimeSpentDTO);

    return this.timeSpentRepository.save(timeSpent);
  }

  async update(id: string, updateTimeSpentDTO: UpdateTimeSpentDTO) {
    const timeSpent = await this.timeSpentRepository.preload({
      ...updateTimeSpentDTO,
      id,
    });
    if (!timeSpent) {
      throw new HttpException(`Task id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.timeSpentRepository.save(timeSpent);
  }

  async remove(id: string) {
    const timeSpent = await this.timeSpentRepository.findOne({
      where: { id },
    });
    if (!timeSpent) {
      throw new HttpException(`Task id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.timeSpentRepository.remove(timeSpent);
  }
}
