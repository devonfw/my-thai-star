-- DISH
INSERT INTO Dish (id, modificationCounter, name, description, price, image) VALUES (0, 1, 'Thai Spicy Basil Fried Rice', 'This is a staple of Thai cooking. Adjust the spices to your own tastes for a really great use for leftover rice!! I get the basil from a local Asian market. It has a different flavor than that of regular basil and makes all the difference in this recipe. It is fast and fairly easy to make, but requires constant stirring', '12.9900000000', 'Dish/basil-fried.jpg');
INSERT INTO Dish (id, modificationCounter, name, description, price, image) VALUES (1, 1, 'Garlic Paradise', 'From the world-famous Gilroy Garlic Festival to a fierce 40-clove garlic chicken in San Francisco and a gut-busting garlic sandwich in Philly, we feature the tastiest places to get your garlic on.', '7.9900000000', 'Dish/garlic-paradise.jpg');
INSERT INTO Dish (id, modificationCounter, name, description, price, image) VALUES (2, 1, 'Thai green chicken curry', 'Master this aromatic, creamy & extremely tasty chicken Thai green curry recipe from Jamie Oliver & treat yourself to an authentic taste of South East Asia.', '14.7500000000', 'Dish/green-curry.jpg');
INSERT INTO Dish (id, modificationCounter, name, description, price, image) VALUES (3, 1, 'Thai Peanut', 'This easy no-cook peanut sauce has a terrific authentic Thai taste. It is spicy and peanutty, and is perfect as a dipping sauce for chicken, shrimp, and beef...or even to use tossed with warm cooked noodles for a quick pasta dish.', '12.2500000000', 'Dish/Thai-Peanut.jpg');
INSERT INTO Dish (id, modificationCounter, name, description, price, image) VALUES (4, 1, 'Thai Thighs', 'Grill over a smoker or just brown in the oven - these moreish chicken pieces are marinated in a blend of lime and pineapple juice, chilli and ginger.', '8.9900000000', 'Dish/Thai-thighs.jpg');
INSERT INTO Dish (id, modificationCounter, name, description, price, image) VALUES (5, 1, 'Thai Roasted', 'This recipe takes that same approach, but instead of lemon as the primary flavor, we’re mixing up a Thai-inspired sauce of lime, a little brown sugar, Sriracha, soy, fish sauce, ginger, and garlic. It may sound like a lot of ingredients, but I bet you have most of these sitting in your pantry already!', '22.1500000000', 'Dish/thai-roasted.jpg');

--Ingredient
INSERT INTO Ingredient (id, modificationCounter, name, description, price) VALUES (0, 1, 'Tofu', 'Also known as bean curd, is a food made by coagulating soy milk and then pressing the resulting curds into soft white blocks. ', '1.0000000000');
INSERT INTO Ingredient (id, modificationCounter, name, description, price) VALUES (1, 1, 'Extra curry', 'The common feature is the use of complex combinations of spices or herbs, usually including fresh or dried hot chillies.', '1.0000000000');

--DishIngredient
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (0, 1, 0, 1);
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (1, 1, 0, 0);
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (2, 1, 1, 1);
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (3, 1, 2, 0);
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (4, 1, 2, 1);
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (5, 1, 3, 0);
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (6, 1, 4, 1);
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (7, 1, 5, 0);
INSERT INTO DishIngredient (id, modificationCounter, idDish, idIngredient) VALUES (8, 1, 5, 1);

INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (0, 1, 'customer', true);
INSERT INTO User(id, modificationCounter, username, password, email, idRole) VALUES (0, 1, 'user0', 'password', 'user0@mail.com', 0);


INSERT INTO Table(id, modificationCounter, seatsNumber) VALUES (0, 1, 4);

INSERT INTO ReservationType(id, modificationCounter, name) VALUES (0, 1, 'reservation');
INSERT INTO ReservationType(id, modificationCounter, name) VALUES (1, 1, 'invitation');


INSERT INTO Reservation (id, modificationCounter, idUser, name, reservationToken, comment, bookingDate, expirationDate, creationDate, canceled, reservationType, idTable) VALUES(0, 1, 0, 'user0', '0000', 'testing...', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, 0, 0);

