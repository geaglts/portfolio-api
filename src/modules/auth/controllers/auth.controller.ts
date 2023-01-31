import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login-by-apikey')
  loginByApiKey(@Req() req: Request) {
    const apiKey = req.header('api-key');
    return this.authService.loginByApiKey(apiKey);
  }
}
