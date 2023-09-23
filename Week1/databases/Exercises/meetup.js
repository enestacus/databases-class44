import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const queries = [
  "DROP DATABASE IF EXISTS meetup",
  "CREATE DATABASE meetup",
  "USE meetup",
  "CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name VARCHAR(255), invited_by INT)",
  "INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Thomas', NULL), ('Arthur', 1), ('John', 2), ('Finn', 3), ('Freddy', 4)",
  "CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(255), floor_number INT)",
  "INSERT INTO Room (room_name, floor_number) VALUES ('Birmingham', 1), ('Manchester', 1), ('London', 1), ('Liverpool', 2), ('Glasgow', 2)",
  "CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, FOREIGN KEY (room_no) REFERENCES Room(room_no) )",
  "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('Money', '2023-08-22 09:00:00', '2023-08-22 12:00:00', 3), ('Guns', '2023-08-22 14:00:00', '2023-08-22 16:00:00', 5), ('Horses', '2023-08-23 09:00:00', '2023-08-23 11:00:00', 4), ('Pubs', '2023-08-23 12:00:00', '2023-08-23 14:00:00', 2), ('Races', '2023-08-23 15:00:00', '2023-08-23 17:00:00', 1)",
];

connection.connect((error) => {
  if (error) {
    console.log("Connection error!");
    return;
  }
  console.log("Connected to the database!");

  executeQueries();
});

function executeQueries() {
  for (let i = 0; i < queries.length; i++) {
    connection.query(queries[i], (error) => {
      if (error) {
        console.error(`Error executing query: ${queries[i]}`);
        throw error;
      }
      console.log(`Query executed: ${queries[i]}`);

      if (i === queries.length - 1) {
        connection.end();
      }
    });
  }
}
