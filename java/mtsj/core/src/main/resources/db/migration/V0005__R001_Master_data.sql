INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (0, 1, 'customer', true);
INSERT INTO User(id, modificationCounter, username, password, email, idRole) VALUES (0, 1, 'user0', 'password', 'user0@mail.com', 0);


INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (0, 1, 4);
INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (1, 1, 4);
INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (2, 1, 4);
INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (3, 1, 4);
INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (4, 1, 6);
INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (5, 1, 6);
INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (6, 1, 6);
INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (7, 1, 8);
INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (8, 1, 8);



INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable) VALUES(0, 1, 0, 'user0', 'CSR20170509123502555Z', 'Booking Type CSR', 'user0@mail.com', CURRENT_TIMESTAMP + (60 * 60 * 24 * 5), CURRENT_TIMESTAMP + (60 * 60 * 24 * 5) - (60 * 60), CURRENT_TIMESTAMP, false, 0, 0);
INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable) VALUES(1, 1, 0, 'user0', 'CSR20170510123502575Z', 'Booking Type GSR', 'user0@mail.com', CURRENT_TIMESTAMP + (60 * 60 * 24 * 5), CURRENT_TIMESTAMP + (60 * 60 * 24 * 5) - (60 * 60), CURRENT_TIMESTAMP, false, 1, 0);