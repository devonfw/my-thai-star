-- This is the SQL script for setting up the DDL for the h2 database
-- In a typical project you would only distinguish between main and test for flyway SQLs
-- However, in this sample application we provde support for multiple databases in parallel
-- You can simply choose the DB of your choice by providing -Pmysql, -Ppostgresql, ... in your maven build

CREATE SEQUENCE IF NOT EXISTS HIBERNATE_SEQUENCE START WITH 1000000;

-- *** Table ***
CREATE TABLE IF NOT EXISTS Board (
  id bigserial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  seatsNumber INTEGER NOT NULL,
  CONSTRAINT PK_Table PRIMARY KEY(id)
);

-- *** UserRole ***
CREATE TABLE IF NOT EXISTS UserRole (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  active BOOLEAN,
  CONSTRAINT PK_UserRole PRIMARY KEY(id)
);

-- *** Customers ***
CREATE TABLE IF NOT EXISTS People (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  username VARCHAR (255) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  secret VARCHAR (255) NULL,
  twoFactorStatus BOOLEAN NULL DEFAULT false,
  email VARCHAR (120) NOT NULL,
  idRole BIGINT NOT NULL,
  CONSTRAINT PK_User PRIMARY KEY(id),
  CONSTRAINT PK_User_idRole FOREIGN KEY(idRole) REFERENCES UserRole (id) 
);

-- *** Booking ***
CREATE TABLE IF NOT EXISTS Booking (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT,
  name VARCHAR (255) NOT NULL,
  bookingToken VARCHAR (255),
  comment VARCHAR (4000),
  email VARCHAR(255) NOT NULL,
  bookingDate TIMESTAMP NOT NULL,
  expirationDate TIMESTAMP,
  creationDate TIMESTAMP,
  canceled BOOLEAN NOT NULL DEFAULT false ,
  bookingType INTEGER,
  idTable BIGINT,
  idOrder BIGINT,
  assistants INTEGER,
  CONSTRAINT PK_Booking PRIMARY KEY(id),
  CONSTRAINT FK_Booking_idUser FOREIGN KEY(idUser) REFERENCES People(id) ,
  CONSTRAINT FK_Booking_idTable FOREIGN KEY(idTable) REFERENCES Board(id) 
);

-- *** InvitedGuest ***
CREATE TABLE IF NOT EXISTS InvitedGuest (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  idBooking BIGINT NOT NULL,
  guestToken VARCHAR (255),
  email VARCHAR (60),
  accepted BOOLEAN,
  modificationDate TIMESTAMP,
  idOrder BIGINT,
  CONSTRAINT PK_InvitedGuest PRIMARY KEY(id),
  CONSTRAINT FK_InvitedGuest_idBooking FOREIGN KEY(idBooking) REFERENCES Booking(id) 
);

-- *** OrderDish ***
CREATE TABLE IF NOT EXISTS Orders (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  idBooking BIGINT NOT NULL,
  idInvitedGuest BIGINT,
  idHost BIGINT,
  CONSTRAINT PK_Order PRIMARY KEY(id),
  CONSTRAINT FK_Order_idBooking FOREIGN KEY(idBooking) REFERENCES Booking(id) ,
  CONSTRAINT FK_Order_idInvitedGuest FOREIGN KEY(idInvitedGuest) REFERENCES InvitedGuest(id) 
);

-- *** Category ***
CREATE TABLE IF NOT EXISTS Category (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  showOrder INTEGER,
  CONSTRAINT PK_Category PRIMARY KEY(id)
);

-- *** Image ***
CREATE TABLE IF NOT EXISTS Image (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR(255),
  content BYTEA,
  contentType INTEGER,
  mimeType VARCHAR(255),
  CONSTRAINT PK_Image PRIMARY KEY(id)
);

-- *** Dish ***
CREATE TABLE IF NOT EXISTS Dish (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  price DECIMAL (16,10),
  idImage BIGINT UNIQUE NOT NULL,
  CONSTRAINT PK_Dish PRIMARY KEY(id),
  CONSTRAINT FK_Dish_idImage FOREIGN KEY(idImage) REFERENCES Image(id) 
);

-- *** DishCategory ***
CREATE TABLE IF NOT EXISTS DishCategory (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  idCategory BIGINT NOT NULL,
  CONSTRAINT PK_DishCategory PRIMARY KEY(id),
  CONSTRAINT FK_DishCategory_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) ,
  CONSTRAINT FK_DishCategory_idCategory FOREIGN KEY(idCategory) REFERENCES Category(id) 
);

-- *** Ingredient ***
CREATE TABLE IF NOT EXISTS Ingredient (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  price DECIMAL (16,10),
  CONSTRAINT PK_Ingredient PRIMARY KEY(id)
);

-- *** DishIngredient ***
CREATE TABLE IF NOT EXISTS DishIngredient (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  idIngredient BIGINT NOT NULL,
  CONSTRAINT PK_DishIngredient PRIMARY KEY(id),
  CONSTRAINT FK_DishIngredient_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) ,
  CONSTRAINT FK_DishIngredient_idIngredient FOREIGN KEY(idIngredient) REFERENCES Ingredient(id) 
);

-- *** OrderLine ***
CREATE TABLE IF NOT EXISTS OrderLine (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  idDish BIGINT NOT NULL,
  amount INTEGER,
  comment VARCHAR (255),
  idOrder BIGINT NOT NULL,
  CONSTRAINT PK_OrderLine PRIMARY KEY(id),
  CONSTRAINT FK_OrderLine_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) ,
  CONSTRAINT FK_OrderLine_idOrder FOREIGN KEY(idOrder) REFERENCES Orders(id) 
);

-- *** OrderDishExtraIngredient ***
CREATE TABLE IF NOT EXISTS OrderDishExtraIngredient (
  id serial NOT NULL,
  modificationCounter INTEGER,
  idOrderLine BIGINT NOT NULL,
  idIngredient BIGINT NOT NULL,
  CONSTRAINT PK_OrderDishExtraIngredient PRIMARY KEY(id),
  CONSTRAINT FK_OrderDishExtraIngredient_idOrderLine FOREIGN KEY(idOrderLine) REFERENCES OrderLine(id) ,
  CONSTRAINT FK_OrderDishExtraIngredient_idIngredient FOREIGN KEY(idIngredient) REFERENCES Ingredient(id) 
);

-- *** UserFavourite ***
CREATE TABLE IF NOT EXISTS UserFavourite (
  id serial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT NOT NULL,
  idDish BIGINT NOT NULL,
  CONSTRAINT PK_UserFavourite PRIMARY KEY(id),
  CONSTRAINT FK_UserFavourite_idUser FOREIGN KEY(idUser) REFERENCES People(id) ,
  CONSTRAINT FK_UserFavourite_idDish FOREIGN KEY(idDish) REFERENCES Dish(id) 
);

-- *************************************************************************

-- *** BinaryObject (BLOBS) ***
CREATE TABLE IF NOT EXISTS BinaryObject (
  id bigserial NOT NULL,
  modificationCounter INTEGER NOT NULL,
  content BYTEA,
  filesize BIGINT NOT NULL,
  mimeType VARCHAR(255),
  PRIMARY KEY (ID)
);

-- *** RevInfo (Commit log for envers audit trail) ***
CREATE TABLE IF NOT EXISTS RevInfo(
  id BIGINT NOT NULL GENERATED BY DEFAULT AS IDENTITY (START WITH 1),
  timestamp BIGINT NOT NULL,
  userLogin VARCHAR(255)
);
