// import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';

describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [ImageController],
    // }).compile();
    // controller = module.get<ImageController>(ImageController);
  });

  it('should be defined', () => {
    expect(controller).not.toBeDefined();
  });
});
