import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotEmptyString } from 'src/common/validators/not-empty-string.validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo',
  })
  @IsNotEmptyString()
  @IsString()
  fullname: string;

  @ApiProperty({
    description: 'Email do usuário',
  })
  @IsNotEmptyString()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha da conta',
  })
  @IsNotEmptyString()
  @IsString()
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
  })
  @IsNotEmptyString()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha da conta',
  })
  @IsNotEmptyString()
  @IsString()
  password: string;
}

export class EmailDto {
  constructor() {
    this.email = '';
  }

  @ApiProperty()
  @IsString()
  @IsNotEmptyString()
  email: string;
}

export class ConfirmationCodeDto {
  constructor() {
    this.email = '';
    this.code = '';
    this.password = '';
  }

  @ApiProperty()
  @IsString()
  @IsNotEmptyString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmptyString()
  code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmptyString()
  password: string;
}

export class ResetPasswordDto {
  constructor() {
    this.email = '';
    this.password = '';
  }

  @ApiProperty()
  @IsString()
  @IsNotEmptyString()
  email: string;

  @ApiProperty({ example: 'John@124185', description: 'A senha do usuário' })
  @IsNotEmptyString()
  @IsString()
  password: string;
}
