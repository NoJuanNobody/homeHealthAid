var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port:3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `

  CREATE DATABASE IF NOT EXISTS homeHealthAidDB;

  USE homeHealthAidDB;
  -- Tasks
  CREATE TABLE Tasks (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      UserId INT,
      Description TEXT,
      TaskType VARCHAR(255),
      IntendedDate DATE,
      DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ArchivedOn TIMESTAMP,
      CreatedBy VARCHAR(255),
      FOREIGN KEY (UserId) REFERENCES Users(UserId)
  );
  -- tasktypes
  CREATE TABLE TaskTypes (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      TaskType VARCHAR(255) UNIQUE
  );
  
  
  -- User Table
  CREATE TABLE Users (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      Username VARCHAR(255),
      FirstName VARCHAR(255),
      LastName VARCHAR(255),
      Address VARCHAR(255),
      Mobile VARCHAR(20),
      UserType ENUM('aid worker', 'administrator', 'patient', 'supervisor'),
      DeletedAt TIMESTAMP,
      UNIQUE (Username)
  );
  
  
  -- User Types Table
  CREATE TABLE UserTypes (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      UserType VARCHAR(255) UNIQUE
  );
  
  
  -- Event Table
  CREATE TABLE HoursWorked (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      EventTypeId INT,
      Date DATETIME,
      UserId INT,
      FOREIGN KEY (EventTypeId) REFERENCES EventTypes(Id),
      FOREIGN KEY (UserId) REFERENCES Users(Id)
  );
  
  -- Event Types Table
  CREATE TABLE EventTypes (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      Description VARCHAR(255) UNIQUE
  );
  
  -- account info
  CREATE TABLE AccountInfo (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      Info TEXT,
      InfoTypeId INT,
      UserId INT,
      FOREIGN KEY (InfoTypeId) REFERENCES AccountInfoTypes(Id),
      FOREIGN KEY (UserId) REFERENCES Users(Id)
  );
  
  -- acountypes
  CREATE TABLE AccountInfoTypes (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      InfoType VARCHAR(255) UNIQUE
  );
  
  
  `;
  con.query(sql, function (err) {
    if (err) throw err;
    console.log("Table created");
  });
});