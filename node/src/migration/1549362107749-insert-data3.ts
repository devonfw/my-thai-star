import { MigrationInterface, QueryRunner } from 'typeorm';
import { OrderLine } from '../app/order/model/entities/order-line.entity';
import { Order } from '../app/order/model/entities/order.entity';
import { orderLinesSample } from './__fixture__/order/order-lines.fixture';
import { ordersSample } from './__fixture__/order/orders.fixture';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class insertData31549362107749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(Order, ordersSample);

    await queryRunner.manager.save(OrderLine, orderLinesSample);

    await queryRunner.query(
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (1, 1, 1, 2);',
    );
    await queryRunner.query(
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (2, 1, 2, 2);',
    );
    await queryRunner.query(
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (3, 1, 3, 1);',
    );
    await queryRunner.query(
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (4, 1, 3, 2);',
    );
    await queryRunner.query(
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (5, 1, 5, 1);',
    );
    await queryRunner.query(
      'INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (6, 1, 6, 1);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM OrderDishExtraIngredient');
    await queryRunner.query('DELETE FROM OrderLine');
    await queryRunner.query('DELETE FROM Orders');
  }
}
