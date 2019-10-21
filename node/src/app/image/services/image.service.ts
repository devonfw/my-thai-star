import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Image } from '../model/entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRespository: Repository<Image>,
  ) {}

  getAllImages(): Promise<Image[]> {
    return this.imageRespository.find();
  }

  getImageById(id: number): Promise<Image | undefined> {
    return this.imageRespository.findOne(id);
  }

  createImage(image: Image): Promise<Image> {
    return this.imageRespository.save(this.imageRespository.create(image));
  }

  async deleteImage(id: number): Promise<DeleteResult> {
    return this.imageRespository.delete(id);
  }
}
