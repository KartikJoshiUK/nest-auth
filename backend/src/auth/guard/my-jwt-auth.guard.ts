import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface User {
  email: string;
  username: string;
  userId: string;
}

@Injectable()
export class MyJWTGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  validateJWT(jwt: string) {
    try {
      const payload: User = this.jwtService.verify(jwt);
      return payload;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const access_token = request.cookies['access_token'];
    const refresh_token = request.cookies['refresh_token'];
    console.log(access_token, refresh_token);
    let payload = null;
    payload = this.validateJWT(access_token);
    if (payload === null) payload = this.validateJWT(refresh_token);
    if (payload === null) return false;
    request.user = payload;
    return true;
  }
}
