INSERT INTO Orders (id, modificationCounter, idReservation, idInvitationGuest) VALUES (0, 1, 0, null);
INSERT INTO Orders (id, modificationCounter, idReservation, idInvitationGuest) VALUES (1, 1, 1, null);

INSERT INTO OrderLine (id, modificationCounter, idPlate, amount, comment, idOrder) VALUES (0, 1, 0, 2, 'please not too spicy', 0);
INSERT INTO OrderLine (id, modificationCounter, idPlate, amount, comment, idOrder) VALUES (1, 1, 4, 1, null, 0);
INSERT INTO OrderLine (id, modificationCounter, idPlate, amount, comment, idOrder) VALUES (2, 1, 2, 1, null, 0);

INSERT INTO OrderLine (id, modificationCounter, idPlate, amount, comment, idOrder) VALUES (3, 1, 4, 2, null, 1);
INSERT INTO OrderLine (id, modificationCounter, idPlate, amount, comment, idOrder) VALUES (4, 1, 2, 1, null, 1);
INSERT INTO OrderLine (id, modificationCounter, idPlate, amount, comment, idOrder) VALUES (5, 1, 3, 1, null, 1);

INSERT INTO OrderPlateExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (0, 1, 0, 1);
INSERT INTO OrderPlateExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (1, 1, 1, 1);
INSERT INTO OrderPlateExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (2, 1, 2, 0);
INSERT INTO OrderPlateExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (3, 1, 2, 1);
INSERT INTO OrderPlateExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (4, 1, 4, 0);
INSERT INTO OrderPlateExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (5, 1, 5, 0);