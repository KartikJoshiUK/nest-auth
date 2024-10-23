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
import { AuthGuard } from '@nestjs/passport';
import { MyJWTGuard } from 'src/auth/guard/my-jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(MyJWTGuard)
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
