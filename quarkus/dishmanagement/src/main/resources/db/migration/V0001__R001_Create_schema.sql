
CREATE SEQUENCE HIBERNATE_SEQUENCE START WITH 1000000;

-- *** Category ***
CREATE TABLE Category (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  showOrder INTEGER,
  CONSTRAINT PK_Category PRIMARY KEY(id)
);

-- *** Image ***
CREATE TABLE Image (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR(255),
  content blob,
  contentType INTEGER,
  mimeType VARCHAR(255),
  CONSTRAINT PK_Image PRIMARY KEY(id)
);

-- *** Dish ***
CREATE TABLE Dish (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  name VARCHAR (255),
  description VARCHAR (4000),
  price DECIMAL (16,10),
  idImage BIGINT UNIQUE NOT NULL,
  CONSTRAINT PK_Dish PRIMARY KEY(id),
  CONSTRAINT FK_Dish_idImage FOREIGN KEY(idImage) REFERENCES Image(id) NOCHECK
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
