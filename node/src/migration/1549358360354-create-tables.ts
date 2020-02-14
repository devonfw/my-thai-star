import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class createTables1549358360354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query('SET AUTOCOMMIT=0;');

    await queryRunner.query(`
CREATE TABLE Tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modificationCounter INTEGER NOT NULL,
    seatsNumber INTEGER NOT NULL
);`);

    await queryRunner.query(`
CREATE TABLE UserRole (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  active BOOLEAN
);`);

    await queryRunner.query(`
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  username VARCHAR (255) NULL,
  password VARCHAR (255) NULL,
  secret VARCHAR (255) NULL,
  twoFactorStatus BOOLEAN NULL DEFAULT FALSE,
  email VARCHAR (120) NULL,
  idRole BIGINT NOT NULL,
  CONSTRAINT PK_User_idRole FOREIGN KEY(idRole) REFERENCES UserRole(id)
);`);

    await queryRunner.query(`
CREATE TABLE Booking (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT,
  name VARCHAR (255) NOT NULL,
  bookingToken VARCHAR (60),
  comment VARCHAR (4000),
  email VARCHAR(255) NOT NULL,
  bookingDate DATETIME NOT NULL,
  expirationDate DATETIME,
  creationDate DATETIME,
  canceled BOOLEAN NOT NULL DEFAULT FALSE,
  bookingType INTEGER,
  idTable BIGINT,
  idOrder BIGINT,
  assistants INTEGER,
  CONSTRAINT FK_Booking_idUser FOREIGN KEY(idUser) REFERENCES Users(id) ,
  CONSTRAINT FK_Booking_idTable FOREIGN KEY(idTable) REFERENCES Tables(id)
);`);

    await queryRunner.query(`
CREATE TABLE InvitedGuest (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  idBooking BIGINT NOT NULL,
  guestToken VARCHAR (60),
  email VARCHAR (60),
  accepted BOOLEAN,
  modificationDate DATETIME,
  idOrder BIGINT,
  CONSTRAINT FK_InvitedGuest_idBooking FOREIGN KEY(idBooking) REFERENCES Booking(id)
);`);

    await queryRunner.query(`
CREATE TABLE Orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  idBooking BIGINT NOT NULL,
  idInvitedGuest BIGINT,
  idHost BIGINT,
  CONSTRAINT FK_Order_idBooking FOREIGN KEY(idBooking) REFERENCES Booking(id) ,
  CONSTRAINT FK_Order_idInvitedGuest FOREIGN KEY(idInvitedGuest) REFERENCES InvitedGuest(id)
);`);

    await queryRunner.query(`
CREATE TABLE Category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  showOrder INTEGER
);`);

    await queryRunner.query(`
CREATE TABLE Image (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR(255),
  content TEXT,
  contentType INTEGER,
  mimeType VARCHAR(255)
);`);

    await queryRunner.query(`
CREATE TABLE Dish (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  price DECIMAL (16,10),
  idImage BIGINT UNIQUE NOT NULL,
  CONSTRAINT FK_Dish_idImage FOREIGN KEY(idImage) REFERENCES Image(id)
);`);

    await queryRunner.query(`
CREATE TABLE DishCategory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  idCategory BIGINT NOT NULL,
  CONSTRAINT FK_DishCategory_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) ,
  CONSTRAINT FK_DishCategory_idCategory FOREIGN KEY(idCategory) REFERENCES Category(id)
);`);

    await queryRunner.query(`
CREATE TABLE Ingredient (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  price DECIMAL (16,10)
);`);

    await queryRunner.query(`
CREATE TABLE DishIngredient (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  idIngredient BIGINT NOT NULL,
  CONSTRAINT FK_DishIngredient_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) ,
  CONSTRAINT FK_DishIngredient_idIngredient FOREIGN KEY(idIngredient) REFERENCES Ingredient(id)
);`);

    await queryRunner.query(`
CREATE TABLE OrderLine (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  amount INTEGER,
  comment VARCHAR (255),
  idOrder BIGINT NOT NULL,
  CONSTRAINT FK_OrderLine_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) ,
  CONSTRAINT FK_OrderLine_idOrder FOREIGN KEY(idOrder) REFERENCES Orders(id)
);`);

    await queryRunner.query(`
CREATE TABLE OrderDishExtraIngredient (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER,
  idOrderLine BIGINT NOT NULL,
  idIngredient BIGINT NOT NULL,
  CONSTRAINT FK_OrderDishExtraIngredient_idOrderLine FOREIGN KEY(idOrderLine) REFERENCES OrderLine(id),
  CONSTRAINT FK_OrderDishExtraIngredient_idIngredient FOREIGN KEY(idIngredient) REFERENCES Ingredient(id)
);`);

    await queryRunner.query(`
CREATE TABLE UserFavourite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT NOT NULL,
  idDish BIGINT NOT NULL,
  CONSTRAINT FK_UserFavourite_idUser FOREIGN KEY(idUser) REFERENCES Users(id) ,
  CONSTRAINT FK_UserFavourite_idDish FOREIGN KEY(idDish) REFERENCES Dish(id)
);`);

    await queryRunner.query(`
CREATE TABLE BinaryObject (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modificationCounter INTEGER NOT NULL,
  data BLOB(2147483647),
  size BIGINT NOT NULL,
  mimeType VARCHAR(255)
);`);

    await queryRunner.query(`
CREATE TABLE RevInfo(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamps BIGINT NOT NULL,
  userLogin VARCHAR(255)
);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE IF EXISTS RevInfo, BinaryObject, UserFavourite, OrderDishExtraIngredient, ' +
        'OrderLine, DishIngredient, Ingredient, DishCategory, Dish, Image, Category, Orders, InvitedGuest, Booking, ' +
        'Users, UserRole, Tables;',
    );
  }
}
