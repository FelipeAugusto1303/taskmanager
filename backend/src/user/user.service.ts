import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  ConfirmationCodeDto,
  CreateUserDto,
  EmailDto,
  LoginDto,
  ResetPasswordDto,
} from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import * as aws from 'aws-sdk';
import * as storage from 'node-persist';

async function setupLocalStorage() {
  await storage.init({
    dir: './local-storage', // Diretório onde os dados serão armazenados
  });
}

@Injectable()
export class UserService {
  private transporter: nodemailer.Transporter;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(private readonly jwtService: JwtService) {
    this.transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2012-10-17',
        accessKeyId: 'AKIA5FTY7PXWKABUD36Y',
        secretAccessKey: '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',
        region: 'us-east-2',
      }),
    });

    setupLocalStorage();
  }

  async create(createUserDto: CreateUserDto) {
    const hasEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (hasEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new HttpException('Login incorrect', HttpStatus.UNAUTHORIZED);
    }

    if (user.password !== loginDto.password) {
      console.log('Entrei', user.password, loginDto.password);
      throw new HttpException('Login incorrect', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async sendEmail(email: EmailDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email: email.email },
    });
    if (!user) {
      throw new HttpException('E-mail não cadastrado', HttpStatus.NOT_FOUND);
    }

    const code = this.generateConfirmationCode();

    await storage.setItem(code, email.email);

    await this.transporter.sendMail({
      to: `${email.email}`,
      from: 'felipe.augusto.1303@gmail.com',
      subject: '<no-reply> TASKMANAGER Código de confirmação',
      text: `Seu codigo de confirmação é ${code}`,
    });
  }

  async confirmCode(confirmationBody: ConfirmationCodeDto): Promise<EmailDto> {
    const value = await storage.getItem(confirmationBody.code);
    if (!value) {
      throw new HttpException('Código Incorreto', HttpStatus.BAD_REQUEST);
    }

    if (value !== confirmationBody.email) {
      throw new HttpException('Código Incorreto', HttpStatus.BAD_REQUEST);
    }

    await storage.removeItem(confirmationBody.code);

    const user: User = await this.userRepository.findOne({
      where: { email: confirmationBody.email },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const entity = this.userRepository.merge(user, {
      ...user,
      password: confirmationBody.password,
    });

    const result = await this.userRepository.save(entity);

    return result;
  }

  async updatePassword(resetPassword: ResetPasswordDto): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { email: resetPassword.email },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const entity = this.userRepository.merge(user, {
      ...user,
      password: resetPassword.password,
    });

    const result = await this.userRepository.save(entity);

    return result;
  }

  generateConfirmationCode(): string {
    const randomNumber = Math.floor(Math.random() * 10000);

    return randomNumber.toString().padStart(4, '0');
  }
}
