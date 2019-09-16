import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response as eResponse } from 'express';
import { AuthService } from './auth.service';
import { UserRequest } from './model/user-request.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  login(@Body() body: any, @Response() res: eResponse) {
    const token = this.authService.login(body);

    token.then(value => {
      res.setHeader('Authorization', 'Bearer ' + value);
      res.setHeader(
        'Access-Control-Expose-Headers',
        'Authorization, X-Mythaistar-Otp',
      );
      res.setHeader('X-Mythaistar-Otp', 'NONE');
      res.send();
    });
  }

  @Get('services/rest/security/v1/currentuser')
  @UseGuards(AuthGuard())
  currentUser(@Request() req: UserRequest) {
    // return {
    //   name: req.user.username,
    //   role: req.user.role.toUpperCase(),
    // };
    return req.user;
  }
}
