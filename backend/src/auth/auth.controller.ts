import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Response as ExpressRes, Request as ExpressReq } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Response() res: ExpressRes) {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
      res,
    );
    console.log(access_token, refresh_token);

    // Set cookies
    res.cookie('access_token', access_token, {
      maxAge: 10 * 60 * 1000,
      path: '/',
      httpOnly: true,
      // ? Read about this
      sameSite: 'lax',
      // ! TODO: on production this should be true
      // secure: true,
    });
    res.cookie('refresh_token', refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      // secure: true,
    });
    res.json({ access_token, refresh_token });
  }

  @Post('signup')
  async signup(
    @Body() { username, email, password }: SignupDto,
    @Response() res: ExpressRes,
  ) {
    const user = await this.authService.signup({ username, email, password });
    return this.authService.login(user, res);
  }
}
