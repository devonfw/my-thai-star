import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Image } from '../model/entities/image.entity';
import { ImageService } from '../services/image.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('services/rest/imagemanagement/v1')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('image')
  async getAllImages(): Promise<Image[]> {
    return plainToClass(Image, await this.imageService.getAllImages());
  }

  @Post('image')
  async saveImage(@Body() image: Image): Promise<Image> {
    return plainToClass(Image, await this.imageService.createImage(image));
  }

  @Get('image/:id')
  async getImage(@Param('id') id: number): Promise<Image | undefined> {
    return plainToClass(Image, await this.imageService.getImageById(id));
  }

  @Delete('image/:id')
  async deleteImage(@Param('id') id: number): Promise<void> {
    await this.imageService.deleteImage(id);
  }
}
