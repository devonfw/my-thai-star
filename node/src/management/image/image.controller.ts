import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { ImageVm } from './models/view-models/image-vm';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';

@Controller('services/rest/imagemanagement/v1/image')
@ApiUseTags('Image')
export class ImageController {
  constructor(private readonly _imageService: ImageService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: ImageVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Image', 'GetAll'))
  async getImages(): Promise<ImageVm[]> {
    try {
      const result = await this._imageService.findAll();
      if (result) return result;
      else throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ImageVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Image', 'GetImage'))
  async getImage(@Param('id') id: number): Promise<ImageVm> {
    try {
      const result = await this._imageService.findById(id);
      if (result) return result;
      else throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: ImageVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Image', 'CreateImage'))
  async saveImage(@Body() image: ImageVm): Promise<ImageVm> {
    try {
      await this._imageService.saveImage(image);
      return image;
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ImageVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Image', 'Delete'))
  async deleteImage(@Param('id') id): Promise<boolean> {
    try {
      return !!(await this._imageService.deleteById(id));
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }
  /* To Implement
    @Post('/image/search')
        async PaginatedListTo < ImageEto > findImagesByPost(ImageSearchCriteriaTo searchCriteriaTo){

        }
        */
}
