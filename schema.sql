DROP DATABASE IF EXISTS employeeTrackDB;

CREATE DATABASE employeeTrackDB;

USE employeeTrackDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  
  PRIMARY KEY (id)
);

INSERT INTO songs (title, artist, genre)
VALUES ("Despacito", "Justin  Beiber", "Pop");

INSERT INTO songs (title, artist, genre)
VALUES ("Jump", "Van Halen", "Rock");

INSERT INTO songs (title, artist, genre)
VALUES ("Break on Through", "Doors", "Rock");

INSERT INTO songs (title, artist, genre)
VALUES ("God's Plan", "Drake", "Rap");

INSERT INTO songs (title, artist, genre)
VALUES ("Chicken Fried", "Zac Brown Band", "Country");