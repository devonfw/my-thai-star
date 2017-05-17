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
  email VARCHAR(255),
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
  showOrder INTEGER,
  CONSTRAINT PK_Category PRIMARY KEY(id),
);

-- *** Image ***
CREATE TABLE Image (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR(255),
  content VARCHAR(2147483647),
  imageType INTEGER,
  extension VARCHAR(5),
  CONSTRAINT PK_Image PRIMARY KEY(id)
);

-- *** Plate ***
CREATE TABLE Plate (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  price DECIMAL (16,10),
  idImage BIGINT UNIQUE NOT NULL,
  CONSTRAINT PK_Plate PRIMARY KEY(id),
  CONSTRAINT FK_Plate_idImage FOREIGN KEY(idImage) REFERENCES Image(id) NOCHECK,
);

-- *** PlateCategory ***
CREATE TABLE PlateCategory (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idPlate BIGINT NOT NULL,
  idCategory BIGINT NOT NULL,
  CONSTRAINT PK_PlateCategory PRIMARY KEY(id),
  CONSTRAINT FK_PlateCategory_idPlate FOREIGN KEY(idPlate) REFERENCES Plate(id) NOCHECK,
  CONSTRAINT FK_PlateCategory_idCategory FOREIGN KEY(idCategory) REFERENCES Category(id) NOCHECK  
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

-- *** PlateIngredient ***
CREATE TABLE PlateIngredient (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idPlate BIGINT NOT NULL,
  idIngredient BIGINT NOT NULL,
  CONSTRAINT PK_PlateIngredient PRIMARY KEY(id),
  CONSTRAINT FK_PlateIngredient_idPlate FOREIGN KEY(idPlate) REFERENCES Plate(id) NOCHECK,
  CONSTRAINT FK_PlateIngredient_idIngredient FOREIGN KEY(idIngredient) REFERENCES Ingredient(id) NOCHECK
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

-- *** OrderPlate ***
CREATE TABLE Orders (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idReservation BIGINT NOT NULL,
  idInvitationGuest BIGINT
  CONSTRAINT PK_Order PRIMARY KEY(id),
  CONSTRAINT FK_Order_idReservation FOREIGN KEY(idReservation) REFERENCES Reservation(id) NOCHECK,
  CONSTRAINT FK_Order_idInvitationGuest FOREIGN KEY(idInvitationGuest) REFERENCES InvitationGuest(id) NOCHECK
);

-- *** OrderLine ***
CREATE TABLE OrderLine (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idPlate BIGINT NOT NULL,
  amount INTEGER,
  comment VARCHAR (255),
  idOrder BIGINT NOT NULL,
  CONSTRAINT PK_OrderLine PRIMARY KEY(id),
  CONSTRAINT FK_OrderLine_idPlate FOREIGN KEY(idPlate) REFERENCES Plate(id) NOCHECK,
  CONSTRAINT FK_OrderLine_idOrder FOREIGN KEY(idOrder) REFERENCES Orders(id) NOCHECK
);

-- *** OrderPlateExtraIngredient ***
CREATE TABLE OrderPlateExtraIngredient (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idOrderLine BIGINT NOT NULL,
  idIngredient BIGINT NOT NULL,
  CONSTRAINT PK_OrderPlateExtraIngredient PRIMARY KEY(id),
  CONSTRAINT FK_OrderPlateExtraIngredient_idOrderLine FOREIGN KEY(idOrderLine) REFERENCES OrderLine(id) NOCHECK,
  CONSTRAINT FK_OrderPlateExtraIngredient_idIngredient FOREIGN KEY(idIngredient) REFERENCES Ingredient(id) NOCHECK
);

-- *** UserFavourite ***
CREATE TABLE UserFavourite (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT NOT NULL,
  idPlate BIGINT NOT NULL,
  CONSTRAINT PK_UserFavourite PRIMARY KEY(id),
  CONSTRAINT FK_UserFavourite_idUser FOREIGN KEY(idUser) REFERENCES User(id) NOCHECK,
  CONSTRAINT FK_UserFavourite_idPlate FOREIGN KEY(idPlate) REFERENCES Plate(id) NOCHECK
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