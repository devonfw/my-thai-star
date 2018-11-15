import {
  Controller,
  Post,
  HttpStatus,
  Body,
  HttpException,
  Req,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserVm } from './models/view-models/user-vm.model';
import { ApiException } from '../../shared/api-exception.model';
import { GetOperationId } from '../../shared/utilities/get-operation-id';
import { RegisterVm } from './models/view-models/register-vm.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { Request } from 'express';

@Controller()
@ApiUseTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('User', 'Register'))
  async register(@Body() registerVm: RegisterVm): Promise<UserVm> {
    try {
      registerVm = this.validateRegister(registerVm);
      const newUser = await this._userService.register(registerVm);
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponseVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('User', 'Login'))
  async login(@Req() req: Request, @Body() loginVm: LoginVm) {
    try {
      const fields = Object.keys(loginVm);
      fields.forEach(field => {
        if (!loginVm[field]) {
          throw new HttpException(
            `${field} is required`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });
      const login = await this._userService.login(loginVm);
      const token = `Bearer ${login.token}`;
      req.res.set('Authorization', token);
      req.res.send();
    } catch (error) {
      throw error;
    }
  }

  validateRegister(register: RegisterVm): RegisterVm {
    try {
      const { username, password, email, role } = register;
      if (!username) {
        throw new HttpException('name is required', HttpStatus.BAD_REQUEST);
      }
      if (!password) {
        throw new HttpException('password is required', HttpStatus.BAD_REQUEST);
      }
      if (!email) {
        throw new HttpException('mail is required', HttpStatus.BAD_REQUEST);
      }
      if (!role) register.role = 'Customer';
      register.role = role.toUpperCase();
      register.username = username.toLowerCase();
      register.email = email.toLowerCase();
      return register;
    } catch (e) {
      throw e;
    }
  }
}
