import { Injectable } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Image } from './models/image.entity';
import { ImageVm } from './models/view-models/image-vm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService extends BaseService<Image> {
  constructor(
    @InjectRepository(Image)
    private readonly _imageRepository: Repository<Image>,
  ) {
    super();
    this._repository = _imageRepository;
  }

  async saveImage(image: ImageVm): Promise<Image> {
    try {
      const imageEntity: Image = await this._imageRepository.create(image);
      return await this._imageRepository.save(imageEntity);
    } catch (error) {
      throw error;
    }
  }
}
