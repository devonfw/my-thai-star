import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable-next-line:class-name
export class insertData31549362107749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest, idHost) VALUES (1, 1, 1, null, 1);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest, idHost) VALUES (2, 1, 4, 1, null);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest, idHost) VALUES (3, 1, 4, 2, null);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest, idHost) VALUES (4, 1, 4, 3, null);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest, idHost) VALUES (5, 1, 4, 4, null);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest, idHost) VALUES (6, 1, 4, 5, null);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest, idHost) VALUES (7, 1, 4, 9, null);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest, idHost) VALUES (8, 1, 4, 10, null);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line: quotemark
      "INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (1, 1, 1, 2, 'please not too spicy', 1);",
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (2, 1, 5, 1, null, 1);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (3, 1, 3, 1, null, 2);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (4, 1, 5, 2, null, 2);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (5, 1, 3, 1, null, 2);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (6, 1, 4, 1, null, 2);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (7, 1, 3, 1, null, 3);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (8, 1, 6, 1, null, 4);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (9, 1, 6, 1, null, 5);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (10, 1, 4, 1, null, 6);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (11, 1, 6, 2, null, 7);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (12, 1, 4, 1, null, 8);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (1, 1, 1, 2);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (2, 1, 2, 2);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (3, 1, 3, 1);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (4, 1, 3, 2);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (5, 1, 5, 1);',
    );
    await queryRunner.query(
      // tslint:disable-next-line:max-line-length
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (6, 1, 6, 1);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM OrderDishExtraIngredient');
    await queryRunner.query('DELETE FROM OrderLine');
    await queryRunner.query('DELETE FROM Orders');
  }
}
