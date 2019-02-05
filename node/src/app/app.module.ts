import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { CoreModule } from './core/core.module';
import { DishModule } from './dish/dish.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    CoreModule,
    DishModule,
    ImageModule,
    UserModule,
    BookingModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
