import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingSearch } from '../../booking/model/dto/booking-search.dto';
import { Roles } from '../../core/auth/decorators/roles.decorator';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { BusinessLogicFilter } from '../../shared/filters/business-logic.filter';
import { NewOrder } from '../model/dto/new-order.dto';
import { OrderPage } from '../model/dto/order-page.dto';
import { Order } from '../model/entities/order.entity';
import { OrderService } from '../services/order.service';

@Controller('services/rest/ordermanagement/v1/order')
@ApiTags('Order')
@UseFilters(BusinessLogicFilter)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createOrder(@Body() order: NewOrder): Promise<Order> {
    if (!order.booking.bookingToken) {
      throw new BadRequestException('Booking token is required');
    }

    return await this.orderService.createOrder(order.orderLines, order.booking.bookingToken.trim());
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('waiter')
  @Post('search')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  async searchOrder(@Body() search: BookingSearch): Promise<OrderPage> {
    const [orders, total] = await this.orderService.searchOrder(
      search.pageable,
      search.email,
      search.bookingToken?.trim(),
    );
    return OrderPage.fromOrders(total, search.pageable, orders);
  }

  @Get('cancelorder/:id')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async cancelOrder(@Param('id') id: number): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}
