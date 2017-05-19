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


-- Common Booking with already created orders
INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable) VALUES(0, 1, 0, 'user0', 'CB_20170509_123502555Z', 'Booking Type CSR', 'user0@mail.com', CURRENT_TIMESTAMP + (60 * 60 * 24 * 5), CURRENT_TIMESTAMP + (60 * 60 * 24 * 5) - (60 * 60), CURRENT_TIMESTAMP, false, 0, 0);
INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable) VALUES(1, 1, 0, 'user0', 'CB_20170510_123502575Z', 'Booking Type GSR', 'user0@mail.com', CURRENT_TIMESTAMP + (60 * 60 * 24 * 5), CURRENT_TIMESTAMP + (60 * 60 * 24 * 5) - (60 * 60), CURRENT_TIMESTAMP, false, 1, 0);
-- Common Booking without orders
INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable) VALUES(2, 1, 0, 'user0', 'CB_20170510_123502595Z', 'Booking Type GSR', 'user0@mail.com', CURRENT_TIMESTAMP + (60 * 60 * 24 * 5), CURRENT_TIMESTAMP + (60 * 60 * 24 * 5) - (60 * 60), CURRENT_TIMESTAMP, false, 0, 0);

-- Guest Booking 
INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable) VALUES(3, 1, 0, 'user1', 'CB_20170510_123502655Z', 'Booking Type GSR', 'user1@mail.com', CURRENT_TIMESTAMP + (60 * 60 * 24 * 5), CURRENT_TIMESTAMP + (60 * 60 * 24 * 5) - (60 * 60), CURRENT_TIMESTAMP, false, 1, 0);
-- guest for booking with id 3
INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(0, 1, 3, 'GB_20170510_12350266501Z', 'guest0@mail.com', true, CURRENT_TIMESTAMP + (60 * 60 * 24 * 5));

-- Guest Booking 
INSERT INTO Booking(id, modificationCounter, idUser, name, bookingToken, comment, email, bookingDate, expirationDate, creationDate, canceled, bookingType, idTable) VALUES(4, 1, 0, 'user1', 'CB_20170510_123502675Z', 'Booking Type GB', 'user1@mail.com', CURRENT_TIMESTAMP + (60 * 60 * 24 * 5), CURRENT_TIMESTAMP + (60 * 60 * 24 * 5) - (60 * 60), CURRENT_TIMESTAMP, false, 1, 0);
-- guest for booking with id 4
INSERT INTO InvitedGuest(id, modificationCounter, idBooking, guestToken, email, accepted, modificationDate) VALUES(1, 1, 4, 'GB_20170510_12350267501Z', 'guest0@mail.com', true, CURRENT_TIMESTAMP + (60 * 60 * 24 * 5));
INSERT INTO Orders (id, modificationCounter, idBooking, idInvitedGuest) VALUES (2, 1, 4, 1);