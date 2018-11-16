import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Repository } from 'typeorm';
import { Image } from './models/image.entity';

describe('Image Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    const repo = new Repository<Image>();
    const _service = new ImageService(repo);
    module = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        {
          provide: ImageService,
          useValue: _service,
        },
      ],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ImageController = module.get<ImageController>(
      ImageController,
    );
    expect(controller).toBeDefined();
  });
});
