import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { BookingSearch } from '../../booking/model/dto/booking-search.dto';
import { Roles } from '../../core/auth/decorators/roles.decorator';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { NewOrder } from '../model/dto/new-order.dto';
import { OrderPage } from '../model/dto/order-page.dto';
import { Order } from '../model/entities/order.entity';
import { OrderService } from '../services/order.service';

@Controller('services/rest/ordermanagement/v1/order')
@ApiUseTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: Order })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async createOrder(@Body() order: NewOrder): Promise<Order> {
    if (!order.booking.bookingToken) {
      throw new BadRequestException('Booking token is required');
    }

    try {
      return await this.orderService.createOrder(
        order.orderLines,
        order.booking.bookingToken,
      );
    } catch (error) {
      throw new BadRequestException(error.message, error);
    }
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('waiter')
  @Post('search')
  @ApiResponse({ status: HttpStatus.OK, type: Order, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async searchOrder(@Body() search: BookingSearch) {
    try {
      const [orders, total] = await this.orderService.searchOrder(
        search.pageable,
        search.email,
        search.bookingToken,
      );
      return OrderPage.fromOrders(total, search.pageable, orders);
    } catch (error) {
      throw new BadRequestException(error.message, error);
    }
  }

  @Get('cancelorder/:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async cancelOrder(@Param('id') id: string): Promise<void> {
    try {
      await this.orderService.deleteOrder(id);
    } catch (error) {
      throw new BadRequestException(error.message, error);
    }
  }
}
