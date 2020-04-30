import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Image } from '../model/entities/image.entity';
import { ImageService } from './image.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { imageSample } from '../../../../test/image/fixtures/images.fixture';

describe('ImageService', () => {
  let service: ImageService;
  let repository: Repository<Image>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Image),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            create: jest.fn().mockImplementationOnce((v: Image) => v),
          },
        },
        ImageService,
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
    repository = module.get<Repository<Image>>(getRepositoryToken(Image));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllImages', () => {
    it('should return all images', () => {
      service.getAllImages();
      expect(repository.find).toBeCalled();
    });
  });

  describe('getImageById', () => {
    it('it should return the image that match with the provided id', () => {
      service.getImageById(5);
      expect(repository.findOne).toBeCalledTimes(1);
      expect(repository.findOne).toBeCalledWith(5);
    });
  });

  describe('createImage', () => {
    it('should save a new image in the database', () => {
      service.createImage(imageSample);
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith(imageSample);
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith(imageSample);
    });
  });

  describe('deleteImage', () => {
    it('should delete the image that match with the provided id', () => {
      service.deleteImage(123);
      expect(repository.delete).toBeCalledTimes(1);
      expect(repository.delete).toBeCalledWith(123);
    });
  });
});
