import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../core/auth/decorators/get-user.decorator';
import { Roles } from '../../core/auth/decorators/roles.decorator';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { User } from '../../core/user/model/entities/user.entity';
import { BusinessLogicFilter } from '../../shared/filters/business-logic.filter';
import { BookingPage } from '../model/dto/booking-page.dto';
import { BookingSearch } from '../model/dto/booking-search.dto';
import { NewBooking } from '../model/dto/new-booking.dto';
import { Booking } from '../model/entities/booking.entity';
import { BookingService } from '../services/booking.service';

@Controller('services/rest/bookingmanagement/v1')
@ApiTags('Booking')
@UseFilters(BusinessLogicFilter)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('booking')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async register(@Body() newBooking: NewBooking, @GetUser() user?: User): Promise<Booking> {
    return await this.bookingService.createBooking(newBooking.booking, newBooking.invitedGuests, user);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @Roles('waiter')
  @Post('booking/search')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  async searchBooking(@Body() search: BookingSearch): Promise<BookingPage> {
    const [bookings, totalElements]: [Booking[], number] = await this.bookingService.searchBooking(search);
    return BookingPage.fromBookings(totalElements, search.pageable, bookings);
  }

  @Get('invitedguest/accept/:token')
  @HttpCode(204)
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async acceptInvitedGuest(@Param('token') token: string): Promise<void> {
    await this.bookingService.updateInvitedGuest(token, true);
  }

  @Get('invitedguest/decline/:token')
  @HttpCode(204)
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async declineInvitedGuest(@Param('token') token: string): Promise<void> {
    await this.bookingService.updateInvitedGuest(token, false);
  }

  @Get('booking/cancel/:token')
  @HttpCode(204)
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async cancelBooking(@Param('token') token: string): Promise<void> {
    await this.bookingService.cancelBooking(token);
  }
}
