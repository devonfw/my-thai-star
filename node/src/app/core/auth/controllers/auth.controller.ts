import { Body, Controller, Get, HttpCode, Post, Response, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as eResponse } from 'express';
import { BusinessLogicFilter } from '../../../shared/filters/business-logic.filter';
import { UserPayload } from '../../user/model/dto/user-payload.dto';
import { User } from '../../user/model/entities/user.entity';
import { GetUser } from '../decorators/get-user.decorator';
import { InvalidUserFilter } from '../filters/invalid-user.filter';
import { LoginDTO } from '../model/login.dto';
import { RegisterDTO } from '../model/register.dto';
import { AuthService } from '../services/auth.service';

@Controller()
@UseFilters(BusinessLogicFilter)
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseFilters(InvalidUserFilter)
  async login(@Body() body: LoginDTO, @Response() res: eResponse): Promise<void> {
    const token = await this.authService.login(body);

    res.setHeader('Authorization', token);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization, X-Mythaistar-Otp');
    res.setHeader('X-Mythaistar-Otp', 'NONE');
    res.status(200).send();
  }

  @Post('register')
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() user: RegisterDTO): Promise<User> {
    return await this.authService.register(user);
  }

  @Get('services/rest/security/v1/currentuser')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  currentUser(@GetUser() user: UserPayload): UserPayload {
    return user;
  }
}
