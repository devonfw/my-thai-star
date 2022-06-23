-- sequences

--changeset liquibase:1
--Database: h2

CREATE SEQUENCE HIBERNATE_SEQUENCE START WITH 100000;

CREATE TABLE "Table" (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL
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

INSERT INTO "Table"(id, modificationCounter, seatsNumber) VALUES (0, 1, 4);
INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable, idOrder, assistants) VALUES(0, 1, 0, 'user0', 'CB_20170509_123502555Z', 'Booking Type CSR', 'user0@mail.com', DATEADD('DAY', 5, CURRENT_TIMESTAMP), DATEADD('DAY', 5, DATEADD('HOUR', -1, CURRENT_TIMESTAMP)), CURRENT_TIMESTAMP, false, 0, 0, 0, 3);
INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(0, 1, 0, 'GB_20170510_02350266501Z', 'guest0@mail.com', true, DATEADD('DAY', 5, CURRENT_TIMESTAMP));
