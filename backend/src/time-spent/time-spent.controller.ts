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

@Controller('time-spent')
export class TimeSpentController {
  constructor(private readonly timeSpentService: TimeSpentService) {}

  @Get()
  findAll() {
    return this.timeSpentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSpentService.findOne(id);
  }

  @Get('/hours/:id')
  findHours(@Param('id') id: string) {
    return this.timeSpentService.findHours(id);
  }

  @Post()
  create(@Body() createTimeSpentDTO: CreateTimeSpentDTO) {
    return this.timeSpentService.create(createTimeSpentDTO);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeSpentDTO: UpdateTimeSpentDTO,
  ) {
    return this.timeSpentService.update(id, updateTimeSpentDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSpentService.remove(id);
  }
}
