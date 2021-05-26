INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (0,0,'ordered');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (1,0,'preparation');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (2,0,'delivery');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (3,0,'delivered');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (4,0,'canceled');

INSERT INTO OrderPaid (id,modificationCounter,paidName) VALUES (0,0,'unpaid');
INSERT INTO OrderPaid (id,modificationCounter,paidName) VALUES (1,0,'paid');

INSERT INTO AddressTable (id,modificationCounter,postCode,city,streetName,houseNumber) VALUES (0,0,'88888','Mannheim','Mainstreet',7);
INSERT INTO AddressTable (id,modificationCounter,postCode,city,streetName,houseNumber) VALUES (1,0,'99999','Heidelberg','Hauptstrasse',8);

INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (0,0,1, 1, 0, null, 0, null);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (1,0,1, 1, 3, 0, null, null);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (2,0,0, 1, 3, 1, null, null);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (3,1,0, 1, 3, 2, null, null);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (4,1,0, 1, 3, 3, null, null);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (5,2,1, 1, 3, 4, null, null);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (6,3,0, 1, 4, 8, null, null);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (7,4,0, 1, 4, 9, null, null);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (8,2,1, 1, 6, null, null, 0);
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress) VALUES (9,2,1, 1, 6, null, null, 1);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (0, 1, 0, 2, 'please not too spicy', 0);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (1, 1, 4, 1, null, 0);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (2, 1, 2, 1, null, 0);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (3, 1, 4, 2, null, 1);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (4, 1, 2, 1, null, 1);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (5, 1, 3, 1, null, 1);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (6, 1, 2, 1, null, 2);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (7, 1, 5, 1, null, 3);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (8, 1, 5, 1, null, 4);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (9, 1, 3, 1, null, 5);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (10, 1, 5, 2, null, 6);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (11, 1, 3, 1, null, 7);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (12, 1, 5, 2, null, 8);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (13, 1, 3, 1, null, 9);

INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (0, 1, 0, 1);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (1, 1, 1, 1);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (2, 1, 2, 0);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (3, 1, 2, 1);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (4, 1, 4, 0);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (5, 1, 5, 0);