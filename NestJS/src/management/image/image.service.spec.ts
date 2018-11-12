import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { Repository, getRepository } from 'typeorm';
import { Image } from './models/image.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ImageService', () => {
  let service: ImageService;
  beforeAll(async () => {
    const repo = new Repository<Image>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        {
          provide: getRepositoryToken(Image),
          useValue: repo,
        },
      ],
    }).compile();
    service = module.get<ImageService>(ImageService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
