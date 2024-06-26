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
  UseGuards,
} from '@nestjs/common';
import { TimeSpentService } from './time-spent.service';
import { CreateTimeSpentDTO } from './dto/create-time-spent.dto';
import { UpdateTimeSpentDTO } from './dto/update-time-spent.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskHour, TimeSpent } from './entities/timeSpent.entity';
import { UserGuard } from 'src/user/user.guard';

@ApiTags('TimeSpent')
@Controller('time-spent')
export class TimeSpentController {
  constructor(private readonly timeSpentService: TimeSpentService) {}

  @Get()
  findAll() {
    return this.timeSpentService.findAll();
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSpentService.findOne(id);
  }

  @ApiOkResponse({
    description:
      'Retorna a lista de horas registradas em uma tarefa especifica por dia',
    type: TaskHour,
    isArray: true,
  })
  @Get('/hours/:taskId')
  findHours(@Param('taskId') id: string) {
    return this.timeSpentService.findHours(id);
  }

  @ApiOkResponse({
    description:
      'Retorna a lista de horas registradas em uma tarefa especifica, com o dia do registro, commentário e quantidade de horas trabalhadas',
    type: TimeSpent,
    isArray: true,
  })
  @Get('/logs/:taskId')
  findAllLogs(@Param('taskId') id: string) {
    return this.timeSpentService.findAllLogs(id);
  }

  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createTimeSpentDTO: CreateTimeSpentDTO) {
    return this.timeSpentService.create(createTimeSpentDTO);
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(UserGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeSpentDTO: UpdateTimeSpentDTO,
  ) {
    return this.timeSpentService.update(id, updateTimeSpentDTO);
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSpentService.remove(id);
  }
}
