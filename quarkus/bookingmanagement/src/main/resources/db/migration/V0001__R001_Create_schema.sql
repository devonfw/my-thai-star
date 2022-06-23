CREATE SEQUENCE HIBERNATE_SEQUENCE START WITH 100000;

CREATE TABLE "Table" (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  seatsNumber INTEGER NOT NULL,
  CONSTRAINT PK_Table PRIMARY KEY(id)
);

CREATE TABLE Booking (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT,
  name VARCHAR (255) NOT NULL,
  bookingToken VARCHAR (255),
  comment VARCHAR (4000),
  email VARCHAR(255) NOT NULL,
  bookingDate TIMESTAMP NOT NULL,
  expirationDate TIMESTAMP,
  creationDate TIMESTAMP,
  canceled BOOLEAN NOT NULL DEFAULT ((0)) ,
  bookingType INTEGER,
  idTable BIGINT,
  idOrder BIGINT,
  assistants INTEGER,
  CONSTRAINT PK_Booking PRIMARY KEY(id)
);

CREATE TABLE InvitedGuest (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idBooking BIGINT NOT NULL,
  guestToken VARCHAR (255),
  email VARCHAR (60),
  accepted BOOLEAN,
  modificationDate TIMESTAMP,
  idOrder BIGINT,
  CONSTRAINT PK_InvitedGuest PRIMARY KEY(id),
  CONSTRAINT FK_InvitedGuest_idBooking FOREIGN KEY(idBooking) REFERENCES Booking(id) NOCHECK
);
