import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskLog } from './entities/tasks.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOkResponse({
    description: 'Retorna a lista de quantidade de tarefas concluídas por dia',
    type: TaskLog,
    isArray: true,
  })
  @Get('/log')
  log() {
    return this.tasksService.taskLog();
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksService.create(createTaskDTO);
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO) {
    return this.tasksService.update(id, updateTaskDTO);
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
