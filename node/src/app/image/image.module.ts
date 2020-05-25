import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { Image } from './model/entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImageModule {}
