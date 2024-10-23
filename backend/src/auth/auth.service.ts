import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Response as ExpressRes } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }
    const { password: _password, ...rest } = user;
    return rest;
  }
  async login(user: User, res: ExpressRes) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    await this.usersService.updateRefreshToken(user.id, refresh_token);
    return { access_token, refresh_token };
  }

  signup({ username, email, password }: SignupDto) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });
  }
}
