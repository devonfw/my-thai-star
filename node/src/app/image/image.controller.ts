import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ImageService } from './image.service';
import { Image } from './model/entities/image.entity';

@Controller('services/rest/imagemanagement/v1')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('image')
  async getAllImages(): Promise<Image[]> {
    return plainToClass(Image, await this.imageService.getAllImages());
  }

  @Post('image')
  async saveImage(@Body() image: Image): Promise<Image> {
    const newImage: Image = plainToClass(
      Image,
      await this.imageService.createImage(image),
    );

    return newImage;
  }

  @Get('image/:id')
  async getImage(@Param('id') id: number): Promise<Image | undefined> {
    const image: Image | undefined = plainToClass(
      Image,
      await this.imageService.getImageById(id),
    );
    return image;
  }

  @Delete('image/:id')
  async deleteImage(@Param('id') id: number): Promise<void> {
    try {
      await this.imageService.deleteImage(id);
    } catch (e) {
      throw new BadRequestException(e.code);
    }
  }
}
