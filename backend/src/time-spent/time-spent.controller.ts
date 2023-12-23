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
import { TimeSpentService } from './time-spent.service';
import { CreateTimeSpentDTO } from './dto/create-time-spent.dto';
import { UpdateTimeSpentDTO } from './dto/update-time-spent.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskHour } from './entities/timeSpent.entity';

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
  @Get('/hours/:id')
  findHours(@Param('id') id: string) {
    return this.timeSpentService.findHours(id);
  }

  @Get('/logs/:id')
  findAllLogs(@Param('id') id: string){
    return this.timeSpentService.findAllLogs(id)
  }

  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createTimeSpentDTO: CreateTimeSpentDTO) {
    return this.timeSpentService.create(createTimeSpentDTO);
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeSpentDTO: UpdateTimeSpentDTO,
  ) {
    return this.timeSpentService.update(id, updateTimeSpentDTO);
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSpentService.remove(id);
  }
}
