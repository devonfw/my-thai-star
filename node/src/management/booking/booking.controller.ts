import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  CreateBookingVm,
  BookingDTO,
  BookingResponseVm,
} from './models/view-models/booking-vm';
import { BookingService } from './booking.service';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { CustomFilter, Response, InvitationResponse } from 'shared/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';
import { Roles } from 'shared/decorators/role.decorator';
import { UserRole } from '../user/models/user-role.enum';
import { BookingView } from '../../shared/interfaces';

@Controller('/services/rest/bookingmanagement/v1/booking')
@ApiUseTags('Booking')
export class BookingController {
  constructor(private readonly _service: BookingService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: BookingDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Booking', 'Create'))
  async createBooking(@Body() input: CreateBookingVm): Promise<BookingDTO> {
    try {
      return await this._service.createBooking(input);
    } catch (e) {
      throw e;
    }
  }

  @Post('search')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Waiter)
  @ApiResponse({ status: HttpStatus.OK, type: BookingResponseVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Booking', 'Search'))
  async getAll(@Body() filter: CustomFilter): Promise<Response<BookingView>> {
    try {
      return await this._service.findBookings(filter);
    } catch (e) {
      throw e;
    }
  }

  @Get('cancel/:token')
  @ApiResponse({ status: HttpStatus.OK, type: InvitationResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Booking', 'Cancel'))
  async cancelBooking(@Param('token') token: string): Promise<any> {
    try {
      const booking = await this._service.findOne({ bookingToken: token });
      return await this._service.deleteById(booking.id);
    } catch (error) {
      return error;
    }
  }
}
