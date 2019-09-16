import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable-next-line:class-name
export class insertData21549361418121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (1, 1, \'Customer\', true);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (2, 1, \'Waiter\', true);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (3, 1, \'Manager\', true);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (4, 1, \'Cook\', true);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (5, 1, \'Barkeeper\', true);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (6, 1, \'Chief\', true);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Users(id, modificationCounter, username, password, twoFactorStatus, email, idRole) VALUES (1, 1, \'user0\', \'{bcrypt}$2a$10$qPM1WjcRKAffHxWXYEfPJOh2vGPlT/Fdv.hJX/LaZjzg/Wtj2csqO\', false, \'user0@mail.com\', 1);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Users(id, modificationCounter, username, password, twoFactorStatus, email, idRole) VALUES (2, 1, \'waiter\', \'{bcrypt}$2a$10$1CAKyUHbX6RJqT5cUP6/aOMTIlYYvGIO/a3Dt/erbYKKgmbgJMGsG\', false, \'waiter@mail.com\', 2);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Users(id, modificationCounter, username, password, twoFactorStatus, email, idRole) VALUES (3, 1, \'manager\', \'{bcrypt}$2a$10$IsTlZemkiPKE2gjtnSMlJOX5.uitNHXNRpLYyvyxNbHEhjpY.XdTq\', false, \'manager@mail.com\', 3);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Users(id, modificationCounter, username, password, twoFactorStatus, email, idRole) VALUES (4, 1, \'cook\', \'{bcrypt}$2a$10$NwpJKhs/3UFHAOWGZhbRW.33Eb.usBOEr4w73gYbyo7a1OD1doIGe\', false, \'cook@mail.com\', 4);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Users(id, modificationCounter, username, password, twoFactorStatus, email, idRole) VALUES (5, 1, \'barkeeper\', \'{bcrypt}$2a$10$8T0JB1c1sWCaClSVBHbP4us38Tg/5j.B.C4T0MJWjQU8CjSGqHuam\', false, \'barkeeper@mail.com\', 5);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Users(id, modificationCounter, username, password, twoFactorStatus, email, idRole) VALUES (6, 1, \'chief\', \'{bcrypt}$2a$10$hfYO45o.cIT0OtGJfNlIJ.l945JECKeEKEy3RxS0cI8jA90YDIpA.\', false, \'chief@mail.com\', 6);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (1, 1, 4);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (2, 1, 4);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (3, 1, 4);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (4, 1, 4);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (5, 1, 6);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (6, 1, 6);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (7, 1, 6);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (8, 1, 8);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Tables(id, modificationCounter, seatsNumber) VALUES (9, 1, 8);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable, idOrder, assistants) VALUES(1, 1, 1, \'user0\', \'CB_20170509_123502555Z\', \'Booking Type CSR\', \'user0@mail.com\', datetime(\'now\', \'+5 day\'), datetime(\'now\', \'+5 day\', \'-1 hour\'), datetime(\'now\'), false, 0, 1, 1, 3);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable, idOrder, assistants) VALUES(2, 1, 1, \'user1\', \'CB_20170510_123502575Z\', \'Booking Type GSR\', \'user1@mail.com\', datetime(\'now\', \'+5 day\'), datetime(\'now\', \'+5 day\', \'-1 hour\'), datetime(\'now\'), false, 1, 2, 2, null);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable, idOrder, assistants) VALUES(3, 1, 1, \'user2\', \'CB_20170510_123502595Z\', \'Booking Type GSR\', \'user2@mail.com\', datetime(\'now\', \'+5 day\'), datetime(\'now\', \'+5 day\', \'-1 hour\'), datetime(\'now\'), false, 0, 3, null, 5);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable, idOrder) VALUES(4, 1, 1, \'host1\', \'CB_20170510_123502655Z\', \'Booking Type GSR\', \'host1@mail.com\', datetime(\'now\', \'+5 day\'), datetime(\'now\', \'+5 day\', \'-1 hour\'), datetime(\'now\'), false, 1, 4, null);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(1, 1, 4, \'GB_20170510_02350266501Z\', \'guest0@mail.com\', true, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(2, 1, 4, \'GB_20170510_12350266501Z\', \'guest1@mail.com\', true, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(3, 1, 4, \'GB_20170510_22350266501Z\', \'guest2@mail.com\', false, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(4, 1, 4, \'GB_20170510_32350266501Z\', \'guest3@mail.com\', true, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(5, 1, 4, \'GB_20170510_42350266501Z\', \'guest4@mail.com\', false, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable, idOrder) VALUES(5, 1, 1, \'host1\', \'CB_20170510_123503600Z\', \'Booking Type GSR\', \'host1@mail.com\', datetime(\'now\', \'+5 day\'), datetime(\'now\', \'+5 day\', \'-1 hour\'), datetime(\'now\'), false, 1, 4, null);',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(6, 1, 4, \'GB_20170510_52350266501Z\', \'guest5@mail.com\', true, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(7, 1, 4, \'GB_20170510_62350266501Z\', \'guest6@mail.com\', false, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(8, 1, 4, \'GB_20170510_72350266501Z\', \'guest7@mail.com\', true, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(9, 1, 4, \'GB_20170510_82350266501Z\', \'guest0@mail.com\', true, datetime(\'now\', \'+5 day\'));',
    );

    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(10, 1, 4, \'GB_20170510_92350266501Z\', \'guest1@mail.com\', false, datetime(\'now\', \'+5 day\'));',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM InvitedGuest');
    await queryRunner.query('DELETE FROM Booking');
    await queryRunner.query('DELETE FROM Tables');
    await queryRunner.query('DELETE FROM Users');
    await queryRunner.query('DELETE FROM UserRole');
  }
}
