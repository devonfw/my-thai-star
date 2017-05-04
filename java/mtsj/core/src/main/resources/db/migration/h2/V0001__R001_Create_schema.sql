-- This is the SQL script for setting up the DDL for the h2 database
-- In a typical project you would only distinguish between main and test for flyway SQLs
-- However, in this sample application we provde support for multiple databases in parallel
-- You can simply choose the DB of your choice by setting spring.profiles.active=XXX in config/application.properties
-- Assuming that the preconfigured user exists with according credentials using the included SQLs

CREATE SEQUENCE HIBERNATE_SEQUENCE START WITH 1000000;

-- *** Table ***
CREATE TABLE Table (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  seatsNumber INTEGER NOT NULL,
  CONSTRAINT PK_Table PRIMARY KEY(id)
);

-- *** UserRole ***
CREATE TABLE UserRole (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  active BOOLEAN,
  CONSTRAINT PK_UserRole PRIMARY KEY(id)
);

-- *** User ***
CREATE TABLE User (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  username VARCHAR (255) NULL,
  password VARCHAR (255) NULL,
  email VARCHAR (120) NULL,
  idRole BIGINT NOT NULL,
  CONSTRAINT PK_User PRIMARY KEY(id),
  CONSTRAINT PK_User_idRole FOREIGN KEY(idRole) REFERENCES UserRole(id) NOCHECK
);

-- *** Reservation ***
CREATE TABLE Reservation (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT,
  name VARCHAR (255),
  reservationToken VARCHAR (60),
  comment VARCHAR (4000),
  bookingDate TIMESTAMP NOT NULL,
  expirationDate TIMESTAMP,
  creationDate TIMESTAMP,
  canceled BOOLEAN NOT NULL DEFAULT ((0)) ,
  reservationType INTEGER,
  idTable BIGINT,
  CONSTRAINT PK_Reservation PRIMARY KEY(id),
  CONSTRAINT FK_Reservation_idUser FOREIGN KEY(idUser) REFERENCES User(id) NOCHECK,
  CONSTRAINT FK_Reservation_idTable FOREIGN KEY(idTable) REFERENCES Table(id) NOCHECK
);

-- *** Category ***
CREATE TABLE Category (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  idgroup BIGINT,
  showOrder INTEGER,
  CONSTRAINT PK_Category PRIMARY KEY(id)
);

-- *** Dish ***
CREATE TABLE Dish (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  price DECIMAL (16,10),
  --image BLOB(2147483647),
  image VARCHAR(2147483647),
  CONSTRAINT PK_Dish PRIMARY KEY(id)
);

-- *** DishCategory ***
CREATE TABLE DishCategory (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  idCategory BIGINT NOT NULL,
  CONSTRAINT PK_DishCategory PRIMARY KEY(id),
  CONSTRAINT FK_DishCategory_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) NOCHECK,
  CONSTRAINT FK_DishCategory_idCategory FOREIGN KEY(idCategory) REFERENCES Category(id) NOCHECK  
);

-- *** Ingredient ***
CREATE TABLE Ingredient (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  price DECIMAL (16,10),
  CONSTRAINT PK_Ingredient PRIMARY KEY(id)
);

-- *** DishIngredient ***
CREATE TABLE DishIngredient (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  idIngredient BIGINT NOT NULL,
  CONSTRAINT PK_DishIngredient PRIMARY KEY(id),
  CONSTRAINT FK_DishIngredient_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) NOCHECK,
  CONSTRAINT FK_DishIngredient_idIngredient FOREIGN KEY(idIngredient) REFERENCES Ingredient(id) NOCHECK
);

-- *** InvitationGuest ***
CREATE TABLE InvitationGuest (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idReservation BIGINT NOT NULL,
  guestToken VARCHAR (60),
  email VARCHAR (60),
  accepted BOOLEAN,
  modificationDate TIMESTAMP,
  CONSTRAINT PK_InvitationGuest PRIMARY KEY(id),
  CONSTRAINT FK_InvitationGuest_idReservation FOREIGN KEY(idReservation) REFERENCES Reservation(id) NOCHECK
);

-- *** OrderDish ***
CREATE TABLE Orders (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idReservation BIGINT NOT NULL,
  idInvitationGuest BIGINT,
  canceled BOOLEAN,
  CONSTRAINT PK_Order PRIMARY KEY(id),
  CONSTRAINT FK_Order_idReservation FOREIGN KEY(idReservation) REFERENCES Reservation(id) NOCHECK,
  CONSTRAINT FK_Order_idInvitationGuest FOREIGN KEY(idInvitationGuest) REFERENCES InvitationGuest(id) NOCHECK
);

-- *** OrderLine ***
CREATE TABLE OrderLine (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  quantity INTEGER,
  comment VARCHAR (255),
  idOrder BIGINT NOT NULL,
  CONSTRAINT PK_OrderLine PRIMARY KEY(id),
  CONSTRAINT FK_OrderLine_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) NOCHECK,
  CONSTRAINT FK_OrderLine_idOrder FOREIGN KEY(idOrder) REFERENCES Orders(id) NOCHECK
);

-- *** OrderDishExtraIngredient ***
CREATE TABLE OrderDishExtraIngredient (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idOrderLine BIGINT NOT NULL,
  idIngredient BIGINT NOT NULL,
  CONSTRAINT PK_OrderDishExtraIngredient PRIMARY KEY(id),
  CONSTRAINT FK_OrderDishExtraIngredient_idOrderLine FOREIGN KEY(idOrderLine) REFERENCES OrderLine(id) NOCHECK,
  CONSTRAINT FK_OrderDishExtraIngredient_idIngredient FOREIGN KEY(idIngredient) REFERENCES Ingredient(id) NOCHECK
);

-- *** ReservationType ***
CREATE TABLE ReservationType (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR (255) NOT NULL,
  CONSTRAINT PK_ReservationType PRIMARY KEY(id)
);

-- *** UserFavourite ***
CREATE TABLE UserFavourite (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT NOT NULL,
  idDish BIGINT NOT NULL,
  CONSTRAINT PK_UserFavourite PRIMARY KEY(id),
  CONSTRAINT FK_UserFavourite_idUser FOREIGN KEY(idUser) REFERENCES User(id) NOCHECK,
  CONSTRAINT FK_UserFavourite_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) NOCHECK
);

-- *************************************************************************

-- *** BinaryObject (BLOBs) ***
CREATE TABLE BinaryObject (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  data BLOB(2147483647),
  size BIGINT NOT NULL,
  mimeType VARCHAR(255),
  PRIMARY KEY (ID)
);

-- *** RevInfo (Commit log for envers audit trail) ***
CREATE TABLE RevInfo(
  id BIGINT NOT NULL GENERATED BY DEFAULT AS IDENTITY (START WITH 1),
  timestamp BIGINT NOT NULL,
  userLogin VARCHAR(255)
);