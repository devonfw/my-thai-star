
CREATE SEQUENCE HIBERNATE_SEQUENCE START WITH 1000000;


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
  secret VARCHAR (255) NULL,
  twoFactorStatus BOOLEAN NULL DEFAULT ((0)),
  email VARCHAR (120) NULL,
  idRole BIGINT NOT NULL,
  CONSTRAINT PK_User PRIMARY KEY(id),
  CONSTRAINT PK_User_idRole FOREIGN KEY(idRole) REFERENCES UserRole(id) NOCHECK
);

-- *** UserFavourite ***
CREATE TABLE UserFavourite (
  id BIGINT NOT NULL AUTO_INCREMENT,
  modificationCounter INTEGER NOT NULL,
  idUser BIGINT NOT NULL,
  idDish BIGINT NOT NULL,
  CONSTRAINT PK_UserFavourite PRIMARY KEY(id),
  CONSTRAINT FK_UserFavourite_idUser FOREIGN KEY(idUser) REFERENCES User(id) NOCHECK
);