var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `

  CREATE DATABASE IF NOT EXISTS root;

  USE root;
  
  -- Tasks Table
  CREATE TABLE IF NOT EXISTS Tasks (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      UserId INT,
      Description TEXT,
      TaskType VARCHAR(255),
      IntendedDate DATE,
      DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ArchivedOn TIMESTAMP,
      CreatedBy VARCHAR(255),
      FOREIGN KEY (UserId) REFERENCES Users(Id)
  );
  
  -- Task Types Table
  CREATE TABLE IF NOT EXISTS TaskTypes (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      TaskType VARCHAR(255) UNIQUE
  );
  
  -- Users Table
  CREATE TABLE IF NOT EXISTS Users (
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
  CREATE TABLE IF NOT EXISTS UserTypes (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      UserType VARCHAR(255) UNIQUE
  );
  
  -- Hours Worked Table
  CREATE TABLE IF NOT EXISTS HoursWorked (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      EventTypeId INT,
      Date DATETIME,
      UserId INT,
      FOREIGN KEY (EventTypeId) REFERENCES EventTypes(Id),
      FOREIGN KEY (UserId) REFERENCES Users(Id)
  );
  
  -- Event Types Table
  CREATE TABLE IF NOT EXISTS EventTypes (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      Description VARCHAR(255) UNIQUE
  );
  
  -- Account Info Table
  CREATE TABLE IF NOT EXISTS AccountInfo (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      Info TEXT,
      InfoTypeId INT,
      UserId INT,
      FOREIGN KEY (InfoTypeId) REFERENCES AccountInfoTypes(Id),
      FOREIGN KEY (UserId) REFERENCES Users(Id)
  );
  
  -- Account Info Types Table
  CREATE TABLE IF NOT EXISTS AccountInfoTypes (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      InfoType VARCHAR(255) UNIQUE
  );
  
  `;
  con.query(sql, function (err) {
    if (err) throw err;
    console.log("Table created");
  });
});