import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((error) => {
  if (error) {
    console.log("Connection error!");
    return;
  }
  console.log("Connected to the database!");
});

connection.query("DROP DATABASE IF EXISTS meetup", (error) => {
  if (error) {
    throw error;
  }
  console.log("Database deleted!");
});

connection.query("CREATE DATABASE meetup", (error) => {
  if (error) {
    throw error;
  }
  console.log("Database created!");
});

connection.query("USE meetup", (error) => {
  if (error) {
    throw error;
  }
  console.log("Database meetup is being used!");
});

connection.query(
  "CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name VARCHAR(255), invited_by INT)",
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Invitee table created!");
  }
);

connection.query(
  "INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Thomas', NULL), ('Arthur', 1), ('John', 2), ('Finn', 3), ('Freddy', 4)",
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Data inserted into the Invitee table!");
  }
);

connection.query(
  "CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(255), floor_number INT)",
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Room table created!");
  }
);

connection.query(
  "INSERT INTO Room (room_name, floor_number) VALUES ('Birmingham', 1), ('Manchester', 1), ('London', 1), ('Liverpool', 2), ('Glasgow', 2)",
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Data inserted into the Room table!");
  }
);

connection.query(
  "CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, FOREIGN KEY (room_no) REFERENCES Room(room_no) )",
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Meeting table created!");
  }
);

connection.query(
  "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('Money', '2023-08-22 09:00:00', '2023-08-22 12:00:00', 3), ('Guns', '2023-08-22 14:00:00', '2023-08-22 16:00:00', 5), ('Horses', '2023-08-23 09:00:00', '2023-08-23 11:00:00', 4), ('Pubs', '2023-08-23 12:00:00', '2023-08-23 14:00:00', 2), ('Races', '2023-08-23 15:00:00', '2023-08-23 17:00:00', 1)",
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Data inserted into the Meeting table!");
  }
);

connection.end();