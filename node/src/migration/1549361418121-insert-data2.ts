import { MigrationInterface, QueryRunner } from 'typeorm';
import { Booking } from '../app/booking/model/entities/booking.entity';
import { InvitedGuest } from '../app/booking/model/entities/invited-guest.entity';
import { Table } from '../app/booking/model/entities/table.entity';
import { UserRole } from '../app/core/user/model/entities/user-role.entity';
import { User } from '../app/core/user/model/entities/user.entity';
import { bookingsSample } from './__fixture__/booking/bookings.fixture';
import { invitedGuestsSample } from './__fixture__/booking/invites-guests.fixture';
import { tablesSample } from './__fixture__/booking/tables.fixture';
import { userRoleSample } from './__fixture__/core/user/user-roles.fixture';
import { userSample } from './__fixture__/core/user/users.fixture';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class insertData21549361418121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(UserRole, userRoleSample);

    await queryRunner.manager.save(User, userSample);

    await queryRunner.manager.save(Table, tablesSample);

    await queryRunner.manager.save(Booking, bookingsSample);

    await queryRunner.manager.save(InvitedGuest, invitedGuestsSample);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM InvitedGuest');
    await queryRunner.query('DELETE FROM Booking');
    await queryRunner.query('DELETE FROM Tables');
    await queryRunner.query('DELETE FROM Users');
    await queryRunner.query('DELETE FROM UserRole');
  }
}
