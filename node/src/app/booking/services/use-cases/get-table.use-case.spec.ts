import { GetTableUseCase } from './get-table.use-case';

describe('GetTableUseCase', () => {
  let uc: GetTableUseCase;

  beforeAll(async () => {
    uc = new GetTableUseCase({
      getFreeTable: jest
        .fn()
        .mockReturnValueOnce([])
        .mockReturnValue([{ id: 1 }]),
    } as any);
  });

  it('should be defined', () => {
    expect(uc).toBeDefined();
  });

  describe('getFreeTable', () => {
    it('should return undefined if there is no free table', () => {
      return expect(uc.getFreeTable(new Date(), 5)).resolves.toStrictEqual(undefined);
    });
    it('should return a table id which is the better table for the number of the assistants', () => {
      return expect(uc.getFreeTable(new Date(), 5)).resolves.toStrictEqual(1);
    });
  });
});
