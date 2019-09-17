import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Roles } from '../core/auth/decorators/roles.decorator';
import { RolesGuard } from '../core/auth/guards/roles.guard';
import { UserRequest } from '../core/auth/model/user-request.interface';
import { BookingService } from './booking.service';
import { BookingPage } from './model/dto/booking-page.dto';
import { BookingSearch } from './model/dto/booking-search.dto';
import { Booking } from './model/entities/booking.entity';

@Controller('services/rest/bookingmanagement/v1')
@ApiUseTags('Booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('booking')
  async register(@Request() req: UserRequest) {
    try {
      return await this.bookingService.createBooking(
        req.body.booking,
        req.body.invitedGuests,
        req.user,
      );
    } catch (e) {
      return new BadRequestException(e.message, e);
    }
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('waiter')
  @Post('booking/search')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  @HttpCode(200)
  async searchBooking(@Body() search: BookingSearch): Promise<BookingPage> {
    try {
      const [bookings, totalElements]: [
        Booking[],
        number
      ] = await this.bookingService.searchBooking(search);
      return BookingPage.fromBookings(totalElements, search.pageable, bookings);
    } catch (error) {
      throw new BadRequestException(error.message, error);
    }
  }

  @Get('invitedguest/accept/:token')
  @HttpCode(204)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async acceptInvitedGuest(@Param('token') token: string): Promise<void> {
    try {
      await this.bookingService.updateInvitedGuest(token, true);
    } catch (error) {
      throw new BadRequestException(error.message, error);
    }
  }

  @Get('invitedguest/decline/:token')
  @HttpCode(204)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async declineInvitedGuest(@Param('token') token: string): Promise<void> {
    try {
      await this.bookingService.updateInvitedGuest(token, false);
    } catch (error) {
      throw new BadRequestException(error.message, error);
    }
  }

  @Get('booking/cancel/:token')
  @HttpCode(204)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async cancelBooking(@Param('token') token: string): Promise<void> {
    try {
      await this.bookingService.cancelBooking(token);
    } catch (error) {
      throw new BadRequestException(error.message, error);
    }
  }
}
