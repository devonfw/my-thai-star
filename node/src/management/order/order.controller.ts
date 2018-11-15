import { Controller, Post, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import {
  OrderListInfo,
  OrderResult,
  CustomOrderFilter,
} from 'shared/interfaces';
import { Order } from './models/order.entity';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';
import { Roles } from 'shared/decorators/role.decorator';
import { UserRole } from 'management/user/models/user-role.enum';

@Controller('/services/rest/ordermanagement/v1/order')
@ApiUseTags('Order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: Order })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Order', 'Create'))
  async createOrder(@Body() input: OrderListInfo): Promise<Order> {
    try {
      return await this.service.createOrder(input);
    } catch (error) {
      throw error;
    }
  }

  @Post('search')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Waiter)
  @ApiResponse({ status: HttpStatus.OK, type: OrderResult })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Order', 'Search'))
  async getAll(@Body() input: CustomOrderFilter): Promise<OrderResult> {
    try {
      return await this.service.getOrders(input);
    } catch (error) {
      throw error;
    }
  }
}
