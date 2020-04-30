import { InvitedGuest } from '../model/entities/invited-guest.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(InvitedGuest)
export class InvitedGuestRepository extends Repository<InvitedGuest> {
  getAcceptedAssistantsByBookingToken(bookingToken: string): Promise<number> {
    return this.createQueryBuilder()
      .innerJoin('Booking', 'booking', 'InvitedGuest.id = booking.id')
      .where('booking.bookingToken = :bookingToken', { bookingToken })
      .andWhere('InvitedGuest.accepted = :accepted', { acepted: true })
      .getCount();
  }
}
