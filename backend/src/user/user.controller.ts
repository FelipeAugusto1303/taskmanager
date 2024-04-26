import { Body, Controller, Patch, Post } from '@nestjs/common';
import {
  ConfirmationCodeDto,
  CreateUserDto,
  EmailDto,
  LoginDto,
  ResetPasswordDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('/create')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @ApiOperation({ summary: 'Send email' })
  @Post('/email')
  async sendEmail(@Body() emailDto: EmailDto): Promise<void> {
    return await this.userService.sendEmail(emailDto);
  }

  @ApiOperation({ summary: 'Confirm code' })
  @Patch('/confirm-code')
  async confirmCode(@Body() body: ConfirmationCodeDto): Promise<EmailDto> {
    return await this.userService.confirmCode(body);
  }
}
