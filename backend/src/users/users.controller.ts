import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Response as ExpressRes } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any): Promise<User> {
    console.log(req.user);
    console.log(req.cookies);

    return req.user;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
}
