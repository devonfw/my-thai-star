import { WrongIdException } from '../../exceptions/wrong-id.exception';
import { DeleteOrderUseCase } from './delete-order.use-case';

describe('DeleteOrderUseCase', () => {
  let uc: DeleteOrderUseCase;

  beforeAll(async () => {
    uc = new DeleteOrderUseCase(
      {
        findOne: jest
          .fn()
          .mockReturnValueOnce(undefined)
          .mockReturnValueOnce({ invitedGuestId: 1 })
          .mockReturnValue({ id: 1 }),
        deleteCascadeOrder: jest.fn(),
      } as any,
      {
        getInvitedGuestById: jest.fn().mockReturnValueOnce(undefined).mockReturnValue({}),
        getBookingById: jest.fn().mockReturnValueOnce(undefined).mockReturnValue({}),
      } as any,
    );
  });

  it('should be defined', () => {
    expect(uc).toBeDefined();
  });

  describe('createOrder', () => {
    it('should throw an error if an invalid order id is passed', () => {
      return expect(uc.deleteOrder(1)).rejects.toThrowError(WrongIdException);
    });
    it('should throw an error if the related invited guest does not exists', () => {
      return expect(uc.deleteOrder(1)).rejects.toThrowError(WrongIdException);
    });
    it('should throw an error if the related booking does not exists', () => {
      return expect(uc.deleteOrder(1)).rejects.toThrowError(WrongIdException);
    });
    it('should delete the order, the order lines and the order line extra ingredients', () => {
      return expect(uc.deleteOrder(1)).resolves.toBeUndefined();
    });
  });
});
