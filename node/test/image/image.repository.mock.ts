import { Image } from '../../src/app/image/model/entities/image.entity';
import { DeleteResult } from 'typeorm';

export class ImageRepositoryMock {
  constructor(private images: Image[]) {}

  async find(): Promise<Image[]> {
    return this.images;
  }

  async findOne(id: number): Promise<Image | undefined> {
    return this.images.find(img => img.id === id);
  }

  async save(image: Image): Promise<Image> {
    this.images.push(image);
    return image;
  }

  async delete(id: number): Promise<DeleteResult> {
    this.images.pop();
    return {
      raw: 'DELETE * FROM IMAGE WHERE id = ' + id,
      affected: 1,
    };
  }
}
